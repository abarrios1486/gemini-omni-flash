"""
omni-video-gen: A professional Python library for next-generation video generation leveraging Gemini Omni and Veo APIs.

This tool acts as a wrapper around the official google-genai library, offering developers high-level interfaces,
rigorous validation structures, and streamlined asynchronous handling for state-of-the-art video compilation using
Gemini Flash 3.5, and Veo 3.1 models.
"""

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
]
