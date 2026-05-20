"""
Pydantic data models for configuration validation and clean structured responses in Gemini Video Generation.
"""

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
    """
    Configuration parameters for compiling or generating a video via the Gemini Omni API.
    
    Validates model compatibility, resolution formats, and video aspect ratios prior to dispatch.
    """
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
    """
    Standard output containing the compiled video tracking data, operation identifiers, and raw video content representation.
    """
    operation_name: str = Field(..., description="The Gemini API task operation ID used for status checking.")
    model_used: str = Field(..., description="The exact model assigned to render the file.")
    duration_seconds: int = Field(..., description="The total validated duration in seconds of the parsed operation.")
    success: bool = Field(default=True, description="Indicating whether the process concluded inside standard parameters.")
    video_bytes: Optional[bytes] = Field(default=None, description="The returned binary raw video data, if retrieved from stream.")
    download_url: Optional[str] = Field(default=None, description="Temporary link to access the cached video directly.")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional properties containing seeds and system statistics.")
