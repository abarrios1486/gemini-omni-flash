"""
Core Client implementation for Gemini Omni Video Generation.
"""

import os
import time
from typing import Optional, Union, Dict, Any
from PIL import Image

# Import the official google-genai library
from google.genai import GoogleGenAI
from google.genai.types import VideoGenerationReferenceImage, VideoGenerationReferenceType

from omni_video_gen.constants import (
    MODEL_VEO_LITE,
    MODEL_VEO_PRO,
    DEFAULT_TIMEOUT_SECONDS,
    DEFAULT_POLL_INTERVAL_SECONDS,
)
from omni_video_gen.models import VideoConfig, VideoGenerationResult
from omni_video_gen.exceptions import (
    ApiKeyMissingError,
    InvalidConfigError,
    GenerationTimeoutError,
    OmniVideoGenError,
)
from omni_video_gen.utils import encode_image_to_base64


class OmniVideoGenerator:
    """
    Main generator class wrapping Gemini Omni / Veo API operations.
    
    Provides high-level, type-safe structures for assembling text-to-video, image-to-video,
    and video extension configurations. Employs the official '@google/genai' telemetry rules.
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        Initializes the OmniVideoGenerator with credentials.

        Args:
            api_key: Optional Gemini API key. Defaults to retrieving 'GEMINI_API_KEY' from Env.

        Raises:
            ApiKeyMissingError: If no API key can be found.
        """
        # Resolve the API key from argument or environment variables
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise ApiKeyMissingError(
                "Gemini API Key is missing. Provide 'api_key' to this constructor, "
                "or set the 'GEMINI_API_KEY' environment variable. Configure this via the secrets panel."
            )

        # Initialize the underlying official GoogleGenAI SDK client with custom telemetry headers
        try:
            from google.genai import GoogleGenAI
            self.sdk_client = GoogleGenAI(
                apiKey=self.api_key,
                httpOptions={
                    "headers": {
                        "User-Agent": "aistudio-build-omni-video-gen",
                    }
                }
            )
        except ImportError:
            # Fallback for mock environments during unit tests
            self.sdk_client = None

    def create_video_operation(
        self,
        config: VideoConfig,
        starting_image: Optional[Union[str, bytes, Image.Image]] = None,
        ending_image: Optional[Union[str, bytes, Image.Image]] = None,
    ) -> str:
        """
        Initiates a long-running video generation task with Gemini Omni API.

        This represents STEP 1 of the official asynchronous pattern: dispatch the job to the API.

        Args:
            config: A validated VideoConfig schema containing models and text prompts.
            starting_image: Optional starting frame for image-to-video synthesis.
            ending_image: Optional ending frame (supported by Veo 3.1) for bounded progression.

        Returns:
            The string identifier of the operation, formatted as 'models/{model}/operations/{id}'.

        Raises:
            InvalidConfigError: If config arguments or models fail consistency rules.
            OmniVideoGenError: If the remote API returns an unexpected error.
        """
        if not self.sdk_client:
            raise OmniVideoGenError("Underlying GoogleGenAI SDK has not been initialized.")

        # Structure payload arguments
        payload: Dict[str, Any] = {
            "model": config.model,
            "prompt": config.prompt,
            "config": {
                "numberOfVideos": config.number_of_videos,
                "resolution": config.resolution,
                "aspectRatio": config.aspect_ratio,
            },
        }

        # Adapt first-frame images if supplied
        if starting_image:
            img_b64, mime_type = encode_image_to_base64(starting_image)
            payload["image"] = {
                "imageBytes": img_b64,
                "mimeType": mime_type,
            }

        # Adapt final-frame images if supplied (Veo Pro only)
        if ending_image:
            if config.model != MODEL_VEO_PRO:
                raise InvalidConfigError(
                    f"Ending-frame/last-frame anchoring is only supported by '{MODEL_VEO_PRO}', not '{config.model}'."
                )
            img_b64, mime_type = encode_image_to_base64(ending_image)
            payload["config"]["lastFrame"] = {
                "imageBytes": img_b64,
                "mimeType": mime_type,
            }

        # Dispatch the request to the Google GenAI backend
        try:
            # Under the hood this sends a POST to start the async pipeline
            operation = self.sdk_client.models.generateVideos(**payload)
            return operation.name
        except Exception as e:
            raise OmniVideoGenError(f"Gemini API failed to start video generation: {e}")

    def check_operation_status(self, operation_name: str) -> bool:
        """
        Queries the current status of the video operation.

        This represents STEP 2 of the official asynchronous pattern: poll status.

        Args:
            operation_name: The operation identifier to query.

        Returns:
            True if the operation has completed (success or failure), False otherwise.
        """
        if not self.sdk_client:
            # Simulated environment handler for unit test framework
            return True

        try:
            from google.genai import GenerateVideosOperation
            op = GenerateVideosOperation()
            op.name = operation_name
            updated = self.sdk_client.operations.getVideosOperation(operation=op)
            return bool(updated.done)
        except Exception as e:
            raise OmniVideoGenError(f"Failed to fetch task status for operation '{operation_name}': {e}")

    def download_video_bytes(self, operation_name: str) -> bytes:
        """
        Retrieves the completed binary raw video contents.

        This represents STEP 3 of the official asynchronous pattern: stream completed content.

        Args:
            operation_name: The verified complete operation identifier.

        Returns:
            Raw binary bytes of the compiled video (usually MP4).

        Raises:
            OmniVideoGenError: If download fails or operation is incomplete.
        """
        if not self.sdk_client:
            return b"simulated_mp4_bytes_from_gemini"

        try:
            from google.genai import GenerateVideosOperation
            import urllib.request

            op = GenerateVideosOperation()
            op.name = operation_name
            
            # Fetch the completed operation results
            updated = self.sdk_client.operations.getVideosOperation(operation=op)
            if not updated.done:
                raise OmniVideoGenError("Cannot download video: The operation is still in progress.")

            # Extract the raw video download URI from the metadata schema
            videos = updated.response.generatedVideos
            if not videos or len(videos) == 0:
                raise OmniVideoGenError("The generation completed but returned an empty video list.")

            video_uri = videos[0].video.uri
            
            # Formulate the download streaming request with explicit API key authorization headers
            req = urllib.request.Request(
                video_uri,
                headers={"x-goog-api-key": self.api_key}
            )
            
            with urllib.request.urlopen(req) as response:
                return response.read()

        except Exception as e:
            raise OmniVideoGenError(f"Failed during download and decryption of Gemini Omni video bytes: {e}")

    def generate_video(
        self,
        prompt: str,
        model: str = MODEL_VEO_LITE,
        resolution: str = "720p",
        aspect_ratio: str = "16:9",
        starting_image: Optional[Union[str, bytes, Image.Image]] = None,
        ending_image: Optional[Union[str, bytes, Image.Image]] = None,
        output_path: Optional[str] = None,
        poll_interval: int = DEFAULT_POLL_INTERVAL_SECONDS,
        timeout: int = DEFAULT_TIMEOUT_SECONDS,
    ) -> VideoGenerationResult:
        """
        Synthesizes prompt-to-video in a single-call ("One-click") polling mechanism.

        Perfect for streamlined command-line use and robust utility scripting.

        Args:
            prompt: Text describing the required visual output.
            model: Target backend model (e.g. 'veo-3.1-lite-generate-preview').
            resolution: Resolution (e.g. '720p', '1080p', or '4k').
            aspect_ratio: Landscape ('16:9') or Portrait ('9:16').
            starting_image: Optional starting image path, bytes, or PIL Image.
            ending_image: Optional bounding target image path, bytes, or PIL Image.
            output_path: Optional local disc path to persist the output MP4 directly.
            poll_interval: Duration (seconds) to wait between progress checks.
            timeout: Maximum overall runtime before raising a timeout exception.

        Returns:
            A populated VideoGenerationResult model containing bytes, operation identifiers, and metadata.
            
        Raises:
            GenerationTimeoutError: If duration exceeded the timeout limits.
            OmniVideoGenError: If the task fails on Google's side.
        """
        # Formulate and validate input config
        config = VideoConfig(
            model=model,
            prompt=prompt,
            resolution=resolution,
            aspect_ratio=aspect_ratio,
            duration_seconds=5 if model == MODEL_VEO_LITE else 7,
        )

        # Step 1: Dispatch operation
        operation_name = self.create_video_operation(
            config=config,
            starting_image=starting_image,
            ending_image=ending_image,
        )

        # Step 2: Poll operation status
        start_time = time.time()
        completed = False

        while time.time() - start_time < timeout:
            completed = self.check_operation_status(operation_name)
            if completed:
                break
            time.sleep(poll_interval)

        if not completed:
            raise GenerationTimeoutError(
                f"Gemini Omni Video Generation exceeded the timeout window limit of {timeout} seconds. "
                f"The task remains processing under operation ID: {operation_name}."
            )

        # Step 3: Download bytes
        video_bytes = self.download_video_bytes(operation_name)

        # Persist to disc if path requested
        saved_file_path = None
        if output_path:
            from omni_video_gen.utils import save_video_to_disc
            saved_file_path = save_video_to_disc(video_bytes, output_path)

        return VideoGenerationResult(
            operation_name=operation_name,
            model_used=model,
            duration_seconds=config.duration_seconds or 5,
            success=True,
            video_bytes=video_bytes,
            download_url=saved_file_path,
            metadata={
                "prompt": prompt,
                "resolution": resolution,
                "aspect_ratio": aspect_ratio,
                "time_taken_seconds": int(time.time() - start_time),
            },
        )
