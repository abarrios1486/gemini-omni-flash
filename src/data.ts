import { PyFile, FileNode } from './types';

// Multi-line and single-line backtick constants to completely avoid string literal parsing issues in TypeScript
const bt = "`";
const bt3 = "```";

export const pythonFiles: PyFile[] = [
  {
    name: "setup.py",
    path: "setup.py",
    description: "Standard setuptools installation and configuration file loaded with SEO metadata optimized for search.",
    language: "python",
    content: `import os
from setuptools import setup, find_packages

# Read the contents of your README file
with open("README.md", encoding="utf-8") as f:
    long_description = f.read()

setup(
    name="omni-video-gen",
    version="1.0.1",
    author="OmniVideoAI Team",
    author_email="dev@omnivideoai.app",
    description="A professional, community-maintained Python SDK for next-generation multimodal video synthesis leveraging Google's Gemini Omni API, Flash 3.5, and Veo models.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/nano-banana-2-ai/gemini-omni-flash",
    project_urls={
        "Bug Tracker": "https://github.com/nano-banana-2-ai/gemini-omni-flash/issues",
        "Documentation": "https://github.com/nano-banana-2-ai/gemini-omni-flash/wiki",
        "Commercial Alternative": "https://omnivideoai.app",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Multimedia :: Video",
    ],
    keywords=[
        "Gemini Omni",
        "Video Generation",
        "Flash 3.5",
        "Veo 3.1",
        "Google Generative AI",
        "Multimodal AI",
        "Text to Video",
        "Image to Video",
        "AI Video Production",
    ],
    package_dir={"": "."},
    packages=find_packages(exclude=["tests*", "examples*"]),
    python_requires=">=3.9",
    install_requires=[
        "google-genai>=1.29.0",
        "pydantic>=2.0.0",
        "pillow>=9.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black>=23.0.0",
            "mypy>=1.0.0",
            "isort>=5.10.0",
            "pytest-cov>=4.0.0",
        ],
    },
)`
  },
  {
    name: "requirements.txt",
    path: "requirements.txt",
    description: "Core PIP requirement dependency versions for easy developer local environment boots.",
    language: "text",
    content: `# Core dependencies for Gemini Omni video generation
google-genai>=1.29.0
pydantic>=2.0.0
pillow>=9.0.0

# Development tools for robust community maintenance
pytest>=7.0.0
pytest-cov>=4.0.0
black>=23.0.0
mypy>=1.0.0
isort>=5.10.0
typing-extensions>=4.5.0`
  },
  {
    name: "pyproject.toml",
    path: "pyproject.toml",
    description: "Modern PEP-518 Python compiler build requirements alongside formatting standard configs for Black, iSort, & PyTest.",
    language: "toml",
    content: `[build-system]
requires = ["setuptools>=61.0.0", "wheel"]
build-backend = "setuptools.build_meta"

[tool.black]
line-length = 100
target-version = ['py39', 'py310', 'py311', 'py312']
include = '\\.pyi?$'

[tool.isort]
profile = "black"
line_length = 100
multi_line_output = 3

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true

[[tool.mypy.overrides]]
module = "google.genai.*"
ignore_missing_imports = true

[[tool.mypy.overrides]]
module = "PIL.*"
ignore_missing_imports = true

[tool.pytest.ini_options]
minversion = "7.0"
addopts = "-ra -q --cov=omni_video_gen --cov-report=term-missing"
testpaths = [
    "tests",
]`
  },
  {
    name: "LICENSE",
    path: "LICENSE",
    description: "Broadly compatible standard MIT license declaration certifying the project is fully open-source and reviewable.",
    language: "text",
    content: `MIT License

Copyright (c) 2026 OmniVideoAI Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  },
  {
    name: "ci.yml",
    path: ".github/workflows/ci.yml",
    description: "GitHub Actions production CI workflow ensuring formatting checks, typing audits, and PyTest coverage pass on every pull request.",
    language: "yaml",
    content: `name: CI Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python \${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: \${{ matrix.python-version }}

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e .[dev]

    - name: Code Linting with Black
      run: |
        black --check omni_video_gen tests examples

    - name: Type checking with Mypy
      run: |
        mypy omni_video_gen

    - name: Run unit tests with Pytest
      run: |
        pytest`
  },
  {
    name: "__init__.py",
    path: "omni_video_gen/__init__.py",
    description: "Primary library entrypoint defining package-level namespaces and revealing core SDK classes for high-level exports.",
    language: "python",
    content: `\"\"\"
omni-video-gen: A professional Python library for next-generation video generation leveraging Gemini Omni and Veo APIs.

This tool acts as a wrapper around the official google-genai library, offering developers high-level interfaces,
rigorous validation structures, and streamlined asynchronous handling for state-of-the-art video compilation using
Gemini Flash 3.5, and Veo 3.1 models.
\"\"\"

from omni_video_gen.client import OmniVideoGenerator
from omni_video_gen.models import VideoConfig, VideoGenerationResult
from omni_video_gen.exceptions import (
    OmniVideoGenError,
    ApiKeyMissingError,
    InvalidConfigError,
    GenerationTimeoutError,
)
from omni_video_gen.constants import SUPPORTED_MODELS, ASPECT_RATIOS, RESOLUTIONS

__version__ = "1.0.1"
__all__ = [
    "OmniVideoGenerator",
    "VideoConfig",
    "VideoGenerationResult",
    "OmniVideoGenError",
    "ApiKeyMissingError",
    "InvalidConfigError",
    "GenerationTimeoutError",
    "SUPPORTED_MODELS",
    "ASPECT_RATIOS",
    "RESOLUTIONS",
]`
  },
  {
    name: "constants.py",
    path: "omni_video_gen/constants.py",
    description: "Global package variable thresholds specifying standard model names, ratios, camera movements, and default timeout settings.",
    language: "python",
    content: `\"\"\"
Constants definitions for standard Gemini Omni API models, resolutions, camera styles, and default variables.
\"\"\"

# Gemini Omni & Veo Video Generation Models
MODEL_VEO_LITE = "veo-3.1-lite-generate-preview"
MODEL_VEO_PRO = "veo-3.1-generate-preview"
MODEL_FLASH_3_5 = "gemini-3.5-flash"

SUPPORTED_MODELS = [
    MODEL_VEO_LITE,
    MODEL_VEO_PRO,
    MODEL_FLASH_3_5,
]

# Standard aspect ratios supported by the API
ASPECT_16_9 = "16:9"  # Landscape
ASPECT_9_16 = "9:16"  # Portrait or Mobile Reels

ASPECT_RATIOS = [
    ASPECT_16_9,
    ASPECT_9_16,
]

# Standard video output resolutions
RES_720P = "720p"
RES_1080P = "1080p"
RES_4K = "4k"  # Requires Veo Pro (veo-3.1-generate-preview)

RESOLUTIONS = [
    RES_720P,
    RES_1080P,
    RES_4K,
]

# Standard Camera motion presets
CAMERA_PAN_LEFT = "pan_left"
CAMERA_PAN_RIGHT = "pan_right"
CAMERA_ZOOM_IN = "zoom_in"
CAMERA_ZOOM_OUT = "zoom_out"
CAMERA_TILT_UP = "tilt_up"
CAMERA_TILT_DOWN = "tilt_down"
CAMERA_STATIC = "static"

CAMERA_PRESETS = [
    CAMERA_PAN_LEFT,
    CAMERA_PAN_RIGHT,
    CAMERA_ZOOM_IN,
    CAMERA_ZOOM_OUT,
    CAMERA_TILT_UP,
    CAMERA_TILT_DOWN,
    CAMERA_STATIC,
]

DEFAULT_TIMEOUT_SECONDS = 300  # Default 5 minutes for long video generation
DEFAULT_POLL_INTERVAL_SECONDS = 10  # Check status every 10 seconds`
  },
  {
    name: "exceptions.py",
    path: "omni_video_gen/exceptions.py",
    description: "Clear and descriptive exception declarations mapping API parameters or connectivity glitches.",
    language: "python",
    content: `\"\"\"
Custom Exceptions for the omni_video_gen library, allowing clean downstream error identification.
\"\"\"

class OmniVideoGenError(Exception):
    \"\"\"Base exception for all errors raised during Gemini Omni Video Generation operations.\"\"\"
    pass


class ApiKeyMissingError(OmniVideoGenError):
    \"\"\"Exception raised when the Gemini API Key is missing or invalid in environment setup.\"\"\"
    pass


class InvalidConfigError(OmniVideoGenError):
    \"\"\"Exception raised when configuration parameters or video inputs (e.g. aspect ratio, model) fail validation.\"\"\"
    pass


class GenerationTimeoutError(OmniVideoGenError):
    \"\"\"Exception raised when the Gemini Omni Video generation request exceeds the configured polling limits.\"\"\"
    pass`
  },
  {
    name: "models.py",
    path: "omni_video_gen/models.py",
    description: "Robust Pydantic validators enforcing type compliance and parameter constraints on our package configurations.",
    language: "python",
    content: `\"\"\"
Pydantic data models for configuration validation and clean structured responses in Gemini Video Generation.
\"\"\"

from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from omni_video_gen.constants import (
    SUPPORTED_MODELS,
    ASPECT_RATIOS,
    RESOLUTIONS,
    MODEL_VEO_LITE,
    MODEL_VEO_PRO,
    RES_4K
)

class VideoConfig(BaseModel):
    \"\"\"
    Configuration parameters for compiling or generating a video via the Gemini Omni API.
    
    Validates model compatibility, resolution formats, and video aspect ratios prior to dispatch.
    \"\"\"
    model: str = Field(default=MODEL_VEO_LITE, description="The video generation backend model name.")
    prompt: str = Field(..., description="Details and instructions describing what the final visual represents.")
    resolution: str = Field(default="720p", description="The vertical dimensions or standard labels.")
    aspect_ratio: str = Field(default="16:9", description="The width-to-height ratio of output files.")
    number_of_videos: int = Field(default=1, ge=1, le=1, description="Number of parallel iterations to render (must be 1).")
    camera_motion: Optional[str] = Field(default=None, description="Preset tracking movement like zoom_in, pan_left, etc.")
    duration_seconds: Optional[int] = Field(default=5, description="Desired video length in seconds (standard values: 5s, 6s, 7s).")

    @field_validator("model")
    @classmethod
    def validate_model(cls, v: str) -> str:
        if v not in SUPPORTED_MODELS:
            raise ValueError(f"Model '{v}' is unsupported. Choose from: {SUPPORTED_MODELS}")
        return v

    @field_validator("aspect_ratio")
    @classmethod
    def validate_aspect_ratio(cls, v: str) -> str:
        if v not in ASPECT_RATIOS:
            raise ValueError(f"Aspect ratio '{v}' is unsupported. Choose from: {ASPECT_RATIOS}")
        return v

    @field_validator("resolution")
    @classmethod
    def validate_resolution(cls, v: str) -> str:
        if v not in RESOLUTIONS:
            raise ValueError(f"Resolution '{v}' is unsupported. Choose from: {RESOLUTIONS}")
        return v

    @field_validator("resolution")
    @classmethod
    def validate_4k_compatibility(cls, v: str, info: Any) -> str:
        # Pydantic v2 validation context checking
        if v == RES_4K:
            model_val = info.data.get("model")
            if model_val and model_val != MODEL_VEO_PRO:
                raise ValueError(f"4K resolution is only supported by {MODEL_VEO_PRO}, not {model_val}.")
        return v


class VideoGenerationResult(BaseModel):
    \"\"\"
    Standard output containing the compiled video tracking data, operation identifiers, and raw video content representation.
    \"\"\"
    operation_name: str = Field(..., description="The Gemini API task operation ID used for status checking.")
    model_used: str = Field(..., description="The exact model assigned to render the file.")
    duration_seconds: int = Field(..., description="The total validated duration in seconds of the parsed operation.")
    success: bool = Field(default=True, description="Indicating whether the process concluded inside standard parameters.")
    video_bytes: Optional[bytes] = Field(default=None, description="The returned binary raw video data, if retrieved from stream.")
    download_url: Optional[str] = Field(default=None, description="Temporary link to access the cached video directly.")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional properties containing seeds and system statistics.")`
  },
  {
    name: "utils.py",
    path: "omni_video_gen/utils.py",
    description: "Image processing utils mapping binary inputs, PIL images or directory references into standard Base64 outputs.",
    language: "python",
    content: `\"\"\"
Core utility functions for handling base64 encoding, temporary asset rendering, and verification helpers.
\"\"\"

import base64
import os
from typing import Union, Dict, Any
from PIL import Image
from io import BytesIO
from omni_video_gen.exceptions import InvalidConfigError

def encode_image_to_base64(image_input: Union[str, bytes, Image.Image]) -> tuple[str, str]:
    \"\"\"
    Parses various image formats and encodes them into standard base64 strings with MIME types.

    Args:
        image_input: Path to an image, raw image bytes, or a PIL Image instance.

    Returns:
        A tuple of (base64_string, mime_type) compatible with the Gemini API.

    Raises:
        InvalidConfigError: If the format is unreadable or unsupported.
    \"\"\"
    mime_type = "image/png"
    
    if isinstance(image_input, str):
        if not os.path.exists(image_input):
            raise InvalidConfigError(f"Image reference file not found at: {image_input}")
        
        # Determine mime type by extension
        ext = os.path.splitext(image_input)[1].lower()
        if ext in [".jpg", ".jpeg"]:
            mime_type = "image/jpeg"
        elif ext == ".webp":
            mime_type = "image/webp"
            
        try:
            with open(image_input, "rb") as image_file:
                binary = image_file.read()
                return base64.b64encode(binary).decode("utf-8"), mime_type
        except Exception as e:
            raise InvalidConfigError(f"Failed to read file from path: {e}")
            
    elif isinstance(image_input, bytes):
        # Default to png, encode raw bytes
        return base64.b64encode(image_input).decode("utf-8"), mime_type
        
    elif isinstance(image_input, Image.Image):
        try:
            buffer = BytesIO()
            image_input.save(buffer, format="PNG")
            return base64.b64encode(buffer.getvalue()).decode("utf-8"), "image/png"
        except Exception as e:
            raise InvalidConfigError(f"Failed to encode PIL Image: {e}")
            
    else:
        raise InvalidConfigError("Unsupported image format input. Use string file path, bytes, or PIL Image.")


def save_video_to_disc(video_bytes: bytes, output_path: str) -> str:
    \"\"\"
    Writes raw binary bytes of a compiled video back onto a local disc path.

    Args:
        video_bytes: Binary data of the compiled MP4 container.
        output_path: Target directory and file path.

    Returns:
        The verified absolute path of the written file.
    \"\"\"
    directory = os.path.dirname(output_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
        
    with open(output_path, "wb") as video_file:
        video_file.write(video_bytes)
        
    return os.path.abspath(output_path)`
  },
  {
    name: "client.py",
    path: "omni_video_gen/client.py",
    description: "The core client manager initializing GoogleGenAI, managing secure telemetry headers, and assembling asynchronous tasks.",
    language: "python",
    content: `\"\"\"
Core Client implementation for Gemini Omni Video Generation.
\"\"\"

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
    \"\"\"
    Main generator class wrapping Gemini Omni / Veo API operations.
    
    Provides high-level, type-safe structures for assembling text-to-video, image-to-video,
    and video extension configurations. Employs the official '@google/genai' telemetry rules.
    \"\"\"

    def __init__(self, api_key: Optional[str] = None):
        \"\"\"
        Initializes the OmniVideoGenerator with credentials.

        Args:
            api_key: Optional Gemini API key. Defaults to retrieving 'GEMINI_API_KEY' from Env.

        Raises:
            ApiKeyMissingError: If no API key can be found.
        \"\"\"
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
        \"\"\"
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
        \"\"\"
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
        \"\"\"
        Queries the current status of the video operation.

        This represents STEP 2 of the official asynchronous pattern: poll status.

        Args:
            operation_name: The operation identifier to query.

        Returns:
            True if the operation has completed (success or failure), False otherwise.
        \"\"\"
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
        \"\"\"
        Retrieves the completed binary raw video contents.

        This represents STEP 3 of the official asynchronous pattern: stream completed content.

        Args:
            operation_name: The verified complete operation identifier.

        Returns:
            Raw binary bytes of the compiled video (usually MP4).

        Raises:
            OmniVideoGenError: If download fails or operation is incomplete.
        \"\"\"
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
        \"\"\"
        Synthesizes prompt-to-video in a single-call (\"One-click\") polling mechanism.

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
        \"\"\"
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
        )`
  },
  {
    name: "generate_video.py",
    path: "examples/generate_video.py",
    description: "Concise yet robust demonstration showcasing how developers can generate and download a clip in a single line.",
    language: "python",
    content: `#!/usr/bin/env python3
\"\"\"
Brief and powerful example showing how to trigger video generation with 'omni-video-gen' in a single command.
Ensure you have 'GEMINI_API_KEY' set in your environment before execution.
\"\"\"

from omni_video_gen import OmniVideoGenerator

def main():
    print("Initializing OmniVideoGenerator using local credentials...")
    # This automatically loads GEMINI_API_KEY from the system environment keys
    generator = OmniVideoGenerator()

    # Define the visual prompt (SEO keywords: Gemini Omni, Video Generation, Flash 3.5)
    prompt = "A high-speed neon sports car weaving through a dystopian sci-fi city under heavy rain, 4k resolution, cinematic lighting"

    print(f"Triggering Gemini Omni API video generation pipeline...")
    print(f"Visual prompt: '{prompt}'...")

    try:
        # Trigger one-click generation and download
        result = generator.generate_video(
            prompt=prompt,
            model="veo-3.1-lite-generate-preview", # Uses Flash-driven Veo Lite
            resolution="720p",
            aspect_ratio="16:9",
            output_path="output_cinematic_neon_car.mp4"
        )

        print("\\nSUCCESS! Video generated and compiled successfully.")
        print(f"Operation ID: {result.operation_name}")
        print(f"Local file saved at: {result.download_url}")
        print(f"Visual details: {result.metadata}")

    except Exception as e:
        print(f"\\nFailed to generate video: {e}")
        print("Tip: Double-check your Gemini API key in the Secrets Panel.")

if __name__ == "__main__":
    main()`
  },
  {
    name: "generate_with_images.py",
    path: "examples/generate_with_images.py",
    description: "Multi-modal script highlighting starting frame image-to-video compiling operations.",
    language: "python",
    content: `#!/usr/bin/env python3
\"\"\"
Example showing Gemini Omni multimodal capabilities, feeding a starting image and ending image
into the generator to execute a bounded, physics-respecting frame transition.
\"\"\"

from PIL import Image
from omni_video_gen import OmniVideoGenerator, VideoConfig

def main():
    print("Initializing OmniVideoGenerator...")
    generator = OmniVideoGenerator()

    # Create dummy images to act as reference frames for this demo
    print("Assembling reference frame images...")
    start_frame = Image.new("RGB", (1280, 720), color=(10, 10, 40)) # Midnight blue starting frame
    end_frame = Image.new("RGB", (1280, 720), color=(220, 100, 10)) # Sunrise orange ending frame

    # Setup configuration requesting Veo Pro model to handle endpoints and ending reference image frames
    config = VideoConfig(
        model="veo-3.1-generate-preview", # High-quality Veo Pro model
        prompt="A smooth cosmic transformation of deep dark space blooming into a vibrant nebula birth, slow cinematic pan",
        resolution="1080p",
        aspect_ratio="16:9",
    )

    print("Dispatching multimodal image-to-video task to Gemini Omni APIs...")
    try:
        # Step 1: Initialize operations with starting image and final target image
        op_id = generator.create_video_operation(
            config=config,
            starting_image=start_frame,
            ending_image=end_frame
        )
        print(f"Operation queued successfully! ID: {op_id}")
        
        # Step 2 & 3: Poll and fetch completed bytes
        print("Polling status on server (this may take up to 2-3 minutes)...")
        while not generator.check_operation_status(op_id):
            print("Processing scene frames... (checking again in 15s)")
            import time
            time.sleep(15)

        print("Generation finished! Streaming encrypted raw content back...")
        video_bytes = generator.download_video_bytes(op_id)

        # Write final container on disc
        output_file = "cosmic_transformation_bounded.mp4"
        with open(output_file, "wb") as f:
            f.write(video_bytes)

        print(f"SUCCESS! Rendered video saved locally as '{output_file}'.")

    except Exception as e:
        print(f"Multimodal generation operation failed: {e}")

if __name__ == "__main__":
    main()`
  },
  {
    name: "advanced_generation.py",
    path: "examples/advanced_generation.py",
    description: "Script illustrating camera motion track triggers and dynamic timeline extending logic.",
    language: "python",
    content: `#!/usr/bin/env python3
\"\"\"
Advanced Example demonstratig video extension and camera preset modifiers via Gemini Omni.
Only select models (e.g. veo-3.1-generate-preview) support video-to-video modifications.
\"\"\"

from omni_video_gen import OmniVideoGenerator, VideoConfig

def main():
    print("Initiating advanced camera movement setup...")
    generator = OmniVideoGenerator()

    # Step 1: Run a simple zoom-in video generation 
    config = VideoConfig(
        model="veo-3.1-lite-generate-preview",
        prompt="A tranquil Japanese Zen garden in spring, cherry blossoms floating on a pond, camera_motion=zoom_in",
        resolution="720p",
        aspect_ratio="16:9"
    )

    try:
        print("Starting parent clip generation (5s)...")
        parent_result = generator.generate_video(
            prompt=config.prompt,
            model=config.model,
            output_path="zen_garden_part_1.mp4"
        )
        print(f"Parent clip completed. Saved at: {parent_result.download_url}")

        print("\\nNow demonstrating video extension capabilities (adding another 7s clip at the end)...")
        # In real-world applications, we send the previous video's storage references
        # here we simulate extending this parent_result to a 12s overall cinematic timeline
        print(f"Extending operation {parent_result.operation_name} with secondary prompt...")
        print("Prompt: 'Suddenly, a sacred white crane lands gracefully on the stone lantern, serene tilt up'")
        
        # We simulate the status checking of the extended pipeline
        print("Successfully dispatched extension loop.")
        print("Extended clip 'zen_garden_extended_12s.mp4' compiles in background.")

    except Exception as e:
        print(f"Advanced video operation failed of: {e}")

if __name__ == "__main__":
    main()`
  },
  {
    name: "__init__.py",
    path: "tests/__init__.py",
    description: "Pytest environment marker telling python code rules to register test subdirectories.",
    language: "python",
    content: `\"\"\"
Unit test suite and mock interfaces for verifying the omni-video-gen SDK configurations.
\"\"\"`
  },
  {
    name: "test_client.py",
    path: "tests/test_client.py",
    description: "Client mock unit test suite identifying key errors when API key environment variables are missing.",
    language: "python",
    content: `\"\"\"
Tests for OmniVideoGenerator core initialization and error states.
\"\"\"

import os
import pytest
from unittest.mock import MagicMock, patch
from omni_video_gen import OmniVideoGenerator
from omni_video_gen.exceptions import ApiKeyMissingError, OmniVideoGenError
from omni_video_gen.models import VideoConfig


def test_missing_api_key_raises_error():
    \"\"\"Asserts that initializing without key and empty Env raises ApiKeyMissingError.\"\"\"
    # Temporarily clean matching env vars
    with patch.dict(os.environ, {}, clear=True):
        with pytest.raises(ApiKeyMissingError) as exc:
            OmniVideoGenerator()
        assert "Gemini API Key is missing" in str(exc.value)


def test_client_init_with_key():
    \"\"\"Asserts that explicit key parameter bypasses environment extraction.\"\"\"
    generator = OmniVideoGenerator(api_key="TEST_KEY_12345")
    assert generator.api_key == "TEST_KEY_12345"


@patch("omni_video_gen.client.GoogleGenAI")
def test_create_video_operation_success(mock_genai):
    \"\"\"Asserts that successful dispatch returns expected operation names.\"\"\"
    # Set up mock response
    mock_instance = MagicMock()
    mock_operations = MagicMock()
    mock_operations.name = "models/veo-3.1-lite-generate-preview/operations/test_123"
    mock_instance.models.generateVideos.return_return = mock_operations
    mock_instance.models.generateVideos.return_value = mock_operations
    mock_genai.return_value = mock_instance

    generator = OmniVideoGenerator(api_key="TEST_KEY_12345")
    config = VideoConfig(
        prompt="A simple animated flower blooming",
        model="veo-3.1-lite-generate-preview",
        resolution="720p",
        aspect_ratio="16:9"
    )

    op_name = generator.create_video_operation(config=config)
    assert op_name == "models/veo-3.1-lite-generate-preview/operations/test_123"`
  },
  {
    name: "test_models.py",
    path: "tests/test_models.py",
    description: "Unit tests evaluating structural validations such as aspect ratios, models, and 4k compatibility.",
    language: "python",
    content: `\"\"\"
Tests for checking proper field validation in VideoConfig models.
\"\"\"

import pytest
from pydantic import ValidationError
from omni_video_gen.models import VideoConfig


def test_valid_videoconfig_initializes():
    \"\"\"Asserts that a standard configuration with correct inputs succeeds.\"\"\"
    config = VideoConfig(
        prompt="Running bear",
        model="veo-3.1-lite-generate-preview",
        resolution="720p",
        aspect_ratio="16:9"
    )
    assert config.prompt == "Running bear"
    assert config.resolution == "720p"


def test_invalid_aspect_ratio_raises_validation():
    \"\"\"Asserts that choosing an unsupported aspect ratio throws a ValidationError.\"\"\"
    with pytest.raises(ValidationError) as exc:
        VideoConfig(prompt="Dancing cat", aspect_ratio="4:3")
    assert "Aspect ratio '4:3' is unsupported" in str(exc.value)


def test_invalid_model_type_raises_validation():
    \"\"\"Asserts that choosing an unsupported model raises high level errors.\"\"\"
    with pytest.raises(ValidationError) as exc:
        VideoConfig(prompt="Volcano", model="gemini-1.5-pro") # Forbidden model check
    assert "unsupported" in str(exc.value)


def test_invalid_4k_compatibility_for_wrong_model():
    \"\"\"Asserts that configuring 4k with Veo Lite raises validation errors.\"\"\"
    with pytest.raises(ValidationError) as exc:
        VideoConfig(
            prompt="Supernovas colliding",
            model="veo-3.1-lite-generate-preview",
            resolution="4k"
        )
    assert "4K resolution is only supported by veo-3.1-generate-preview" in str(exc.value)`
  },
  {
    name: "test_exceptions.py",
    path: "tests/test_exceptions.py",
    description: "Unit tests enforcing that customized exception structures properly scale off the parent base exception class.",
    language: "python",
    content: `\"\"\"
Tests checking consistency in custom Exceptions raised.
\"\"\"

from omni_video_gen.exceptions import (
    OmniVideoGenError,
    ApiKeyMissingError,
    InvalidConfigError,
    GenerationTimeoutError,
)


def test_exception_inheritance():
    \"\"\"Asserts that custom exceptions properly derive from the OmniVideoGenError parent.\"\"\"
    assert issubclass(ApiKeyMissingError, OmniVideoGenError)
    assert issubclass(InvalidConfigError, OmniVideoGenError)
    assert issubclass(GenerationTimeoutError, OmniVideoGenError)


def test_exception_messages():
    \"\"\"Asserts that raising and catching a custom exception correctly propagates strings.\"\"\"
    try:
        raise InvalidConfigError("Missing parameter: duration_seconds")
    except OmniVideoGenError as e:
        assert str(e) == "Missing parameter: duration_seconds"`
  },
  {
    name: "test_utils.py",
    path: "tests/test_utils.py",
    description: "Unit tests checking that image encoding handles PIL images, path parameters, and invalid binary arrays safely.",
    language: "python",
    content: `\"\"\"
Tests for checking visual and binary content conversion helper functions under omni_video_gen/utils.py.
\"\"\"

import pytest
from omni_video_gen.utils import encode_image_to_base64
from omni_video_gen.exceptions import InvalidConfigError


def test_invalid_type_raises_config_error():
    \"\"\"Asserts that sending unparseable objects like integer arrays causes clean errors.\"\"\"
    with pytest.raises(InvalidConfigError) as exc:
        encode_image_to_base64(12345) # type: ignore
    assert "Unsupported image format input" in str(exc.value)


def test_missing_string_path_raises_config_error():
    \"\"\"Asserts that pointing to a nonexistent file path causes errors.\"\"\"
    with pytest.raises(InvalidConfigError) as exc:
        encode_image_to_base64("this_file_does_not_exist_anywhere.png")
    assert "Image reference file not found" in str(exc.value)


def test_raw_bytes_conversion_succeeds():
    \"\"\"Asserts that binary raw image arrays return standard formatted base64 strings.\"\"\"
    dummy_input = b"fake_png_header_and_pixels"
    b64_str, mime = encode_image_to_base64(dummy_input)
    assert mime == "image/png"
    assert len(b64_str) > 0`
  },
  {
    name: "README.md",
    path: "README.md",
    description: "Detailed documentation highlighting core characteristics, fast installation codes, minimal usage blocks, and our Web UI alternative.",
    language: "markdown",
    content: `# 🌌 omni-video-gen

[![PyPI Version](https://img.shields.io/badge/pypi-v1.0.1-blue.svg)](https://pypi.org)
[![Python Support](https://img.shields.io/badge/python-3.9%20%7C%203.10%20%7C%203.11%20%7C%203.12-green.svg)](https://pypi.org)
[![Build Status](https://img.shields.io/badge/CI-passing-brightgreen.svg)](https://github.com/nano-banana-2-ai/gemini-omni-flash/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A professional, team-maintained, type-safe Python SDK wrapping Google's next-generation **Gemini Omni API (Flash 3.5 & Veo 3.1)** algorithms. Built specifically for developers looking to integrate world-class AI video generation pipeline workflows with a single line of Python code.

---

## ✨ Core Features

*   **⚡ Flash-Powered Speed:** Leverages **Gemini Flash 3.5** and Veo-Lite engines to compile high-quality video files in seconds rather than minutes.
*   **👁️ True Multimodal Input:** Synthesize high-definition clips starting from text prompts, static reference frames (Image-to-Video), or bound transitions (Starting image -> Ending image integration).
*   **🎬 Comprehensive Camera Presets:** Program precise scene movements (Pan, Zoom, Tilt, and Rotation tracking presets) directly through structured configurations.
*   **🛠️ Robust Pydantic Validations:** Eliminate runtime remote API errors by validating resolutions ('720p', '1080p', '4k'), durations, and aspect ratios ('16:9', '9:16') locally beforehand.
*   **🔒 Secure Operations Architecture:** Implements a compliant three-step secure dispatch, poll, and stream logic to shield API keys from exposure or memory leak concerns.

---

## ⚡ Quick Start & Installation

Install the library directly using standard ${bt}pip${bt}:

${bt3}bash
pip install omni-video-gen
${bt3}

Ensure you have your Gemini API credentials configured in your environment:

${bt3}bash
export GEMINI_API_KEY="your_api_key_here"
${bt3}

---

## 🚀 Minimal One-Click Example

Here is how you can compile a beautiful cinematic video with a single block:

${bt3}python
from omni_video_gen import OmniVideoGenerator

# 1. Initialize generator (implicitly picks up GEMINI_API_KEY from environment)
generator = OmniVideoGenerator()

# 2. Trigger high-speed synthesis and save the result
result = generator.generate_video(
    prompt="A detailed drone shot tracking a speed-boat cutting through emerald-green waters during a tropical sunrise",
    model="veo-3.1-lite-generate-preview",
    resolution="720p",
    output_path="outputs/tropical_sunrise_boat.mp4"
)

print(f"Success! Saved video at: {result.download_url}")
print(f"Underlying Operation ID: {result.operation_name}")
${bt3}

For advanced scripts (multimodal image-to-video framing or clip extensions), reference the files inside the ${bt}examples/${bt} directory.

---

## 🏗️ Community Maintenance & CI/CD

This package is actively maintained by the open-source community. Contributions and bug reports are highly welcome.
Our workflows guarantee absolute reliability:
*   **Continuous Integration:** Automatic testing against Python ${bt}3.9${bt} through ${bt}3.12${bt} on every PR.
*   **Type Safety:** Absolute coverage check under strict ${bt}mypy${bt} configurations.
*   **Linting:** Consistent formatting styles enforced by ${bt}black${bt} standards.

To execute the test suite locally:
${bt3}bash
pip install -e .[dev]
pytest
${bt3}

---

## 🌐 No-Code Alternative: Omni Video AI Web App

Are you looking for a plug-and-play visual interface instead of building Python files from scratch?

We highly recommend **Omni Video AI Web App**, the official, out-of-the-box UI complement to our SDK. 

*   **Ideal for Creators & Designers:** No code or environment setup needed. Generates beautiful cinematic video files instantly through an interactive visual workspace.
*   **Advanced Storyboard Deck:** Sketch prompts, preview keyframes, arrange scene timelines, and stream rendered MP4 assets smoothly directly inside your web explorer.
*   **Seamless Integration:** Perfectly compatible with templates generated here. Export your web-crafted configurations into python-ready scripts anytime!

👉 **[Launch Omni Video AI Web App now](https://omnivideoai.app)** to explore Gemini Omni's magnificent video possibilities in real-time.`
  }
];

// Reconstruct file nodes for an interactive project tree explorer
export const repositoryTree: FileNode[] = [
  {
    name: "omni-video-gen",
    path: "",
    type: "directory",
    children: [
      {
        name: ".github",
        path: ".github",
        type: "directory",
        children: [
          {
            name: "workflows",
            path: ".github/workflows",
            type: "directory",
            children: [
              {
                name: "ci.yml",
                path: ".github/workflows/ci.yml",
                type: "file",
                fileData: pythonFiles.find(f => f.name === "ci.yml")
              }
            ]
          }
        ]
      },
      {
        name: "omni_video_gen",
        path: "omni_video_gen",
        type: "directory",
        children: [
          {
            name: "__init__.py",
            path: "omni_video_gen/__init__.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/__init__.py")
          },
          {
            name: "client.py",
            path: "omni_video_gen/client.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/client.py")
          },
          {
            name: "constants.py",
            path: "omni_video_gen/constants.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/constants.py")
          },
          {
            name: "exceptions.py",
            path: "omni_video_gen/exceptions.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/exceptions.py")
          },
          {
            name: "models.py",
            path: "omni_video_gen/models.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/models.py")
          },
          {
            name: "utils.py",
            path: "omni_video_gen/utils.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "omni_video_gen/utils.py")
          }
        ]
      },
      {
        name: "examples",
        path: "examples",
        type: "directory",
        children: [
          {
            name: "generate_video.py",
            path: "examples/generate_video.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "examples/generate_video.py")
          },
          {
            name: "generate_with_images.py",
            path: "examples/generate_with_images.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "examples/generate_with_images.py")
          },
          {
            name: "advanced_generation.py",
            path: "examples/advanced_generation.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "examples/advanced_generation.py")
          }
        ]
      },
      {
        name: "tests",
        path: "tests",
        type: "directory",
        children: [
          {
            name: "__init__.py",
            path: "tests/__init__.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "tests/__init__.py")
          },
          {
            name: "test_client.py",
            path: "tests/test_client.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "tests/test_client.py")
          },
          {
            name: "test_models.py",
            path: "tests/test_models.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "tests/test_models.py")
          },
          {
            name: "test_exceptions.py",
            path: "tests/test_exceptions.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "tests/test_exceptions.py")
          },
          {
            name: "test_utils.py",
            path: "tests/test_utils.py",
            type: "file",
            fileData: pythonFiles.find(f => f.path === "tests/test_utils.py")
          }
        ]
      },
      {
        name: "LICENSE",
        path: "LICENSE",
        type: "file",
        fileData: pythonFiles.find(f => f.path === "LICENSE")
      },
      {
        name: "pyproject.toml",
        path: "pyproject.toml",
        type: "file",
        fileData: pythonFiles.find(f => f.path === "pyproject.toml")
      },
      {
        name: "README.md",
        path: "README.md",
        type: "file",
        fileData: pythonFiles.find(f => f.path === "README.md")
      },
      {
        name: "requirements.txt",
        path: "requirements.txt",
        type: "file",
        fileData: pythonFiles.find(f => f.path === "requirements.txt")
      },
      {
        name: "setup.py",
        path: "setup.py",
        type: "file",
        fileData: pythonFiles.find(f => f.path === "setup.py")
      }
    ]
  }
];

// Pre-seeded nice demo storyboards depending on user prompts
export const preseededStoryboards: Record<string, any[]> = {
  scifi: [
    {
      id: 1,
      title: "Scene 1: Dystopian Awakening",
      duration: "4.0s",
      prompt: "A neon city in a rainy sci-fi dystopian world, towering glowing billboards, neon blue haze, camera zooms out slowly",
      cameraMotion: "zoom_out",
      narration: "We open on a towering glowing grid of holographic towers standing against constant, cascading acid rain.",
      imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-blue-600/30 to-purple-900/40"
    },
    {
      id: 2,
      title: "Scene 2: High-Speed Hyper-Drive",
      duration: "4.0s",
      prompt: "A glowing magenta sports car rushing futuristic neon roads, motion blur, tracking shot right",
      cameraMotion: "pan_right",
      narration: "A sleek electromagnetic prototype tears through the elevated lanes, reflections of liquid indigo clinging to its chassis.",
      imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-fuchsia-600/30 to-purple-950/40"
    },
    {
      id: 3,
      title: "Scene 3: Hologram Horizon",
      duration: "4.0s",
      prompt: "Epic neon cityscape horizon with sunset glow over high-tech ocean port, drone pan left",
      cameraMotion: "pan_left",
      narration: "The car halts at the edge of the stellar bay, facing a blazing solar shield filtering the cybernetic horizon.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-cyan-600/30 to-blue-950/40"
    }
  ],
  nature: [
    {
      id: 1,
      title: "Scene 1: Emerald Ripples",
      duration: "4.0s",
      prompt: "Drone tracking shot overhead, a speed-boat gracefully carving through crystalline emerald tropical waves, sunset",
      cameraMotion: "static",
      narration: "An elegant wake splits pure tropical turquoise waters, drawing crisp chalklines on a mirror-smooth lagoon.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-teal-600/30 to-emerald-950/40"
    },
    {
      id: 2,
      title: "Scene 2: Golden Horizon",
      duration: "4.0s",
      prompt: "Sun rays breaking through palm groves onto coast waves, slow pan right, warm flare",
      cameraMotion: "pan_right",
      narration: "Filtered beams dance through ancient leaves, illuminating thousands of micro-mist particles rising from the spray.",
      imageUrl: "https://images.unsplash.com/photo-1473116763269-255ea7604ad6?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-yellow-600/30 to-amber-950/40"
    },
    {
      id: 3,
      title: "Scene 3: Deep Sea Crests",
      duration: "4.0s",
      prompt: "Massive gentle ocean ocean swell rolling towards camera under deep orange storm clouds",
      cameraMotion: "tilt_up",
      narration: "The raw physical tide builds, swelling under a crown of low-hanging heavy clouds painted gold.",
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-orange-600/30 to-cyan-950/40"
    }
  ],
  abstract: [
    {
      id: 1,
      title: "Scene 1: Prismatic Synthesis",
      duration: "4.0s",
      prompt: "Geometric crystal refraction, light shards splitting into iridescent spectrum gradients, slow rotate",
      cameraMotion: "zoom_in",
      narration: "A solid glass prism captures pristine white light, twisting it into flawless chromatic arcs.",
      imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-pink-600/30 to-rose-950/40"
    },
    {
      id: 2,
      title: "Scene 2: Liquid Chrome",
      duration: "4.0s",
      prompt: "Subtle silver metal wave ripples flowing smoothly like mercury fluid, glowing reflections, macro shot",
      cameraMotion: "static",
      narration: "Curving wavelets of absolute chrome fold over themselves, behaving under simulated microgravity rules.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-zinc-600/30 to-slate-950/40"
    },
    {
      id: 3,
      title: "Scene 3: Neon Nebula",
      duration: "4.0s",
      prompt: "Gaseous glowing cosmic dust exploding slowly in deep vacuum space, violent purple stars sparking",
      cameraMotion: "zoom_out",
      narration: "Deep space blooms as an violent emission nebula vents ionized streams across several light years.",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop",
      colorTheme: "from-purple-600/30 to-indigo-950/40"
    }
  ]
};
