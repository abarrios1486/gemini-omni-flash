"""
Tests for checking proper field validation in VideoConfig models.
"""

import pytest
from pydantic import ValidationError
from omni_video_gen.models import VideoConfig


def test_valid_videoconfig_initializes():
    """Asserts that a standard configuration with correct inputs succeeds."""
    config = VideoConfig(
        prompt="Running bear",
        model="veo-3.1-lite-generate-preview",
        resolution="720p",
        aspect_ratio="16:9"
    )
    assert config.prompt == "Running bear"
    assert config.resolution == "720p"


def test_invalid_aspect_ratio_raises_validation():
    """Asserts that choosing an unsupported aspect ratio throws a ValidationError."""
    with pytest.raises(ValidationError) as exc:
        VideoConfig(prompt="Dancing cat", aspect_ratio="4:3")
    assert "Aspect ratio '4:3' is unsupported" in str(exc.value)


def test_invalid_model_type_raises_validation():
    """Asserts that choosing an unsupported model raises high level errors."""
    with pytest.raises(ValidationError) as exc:
        VideoConfig(prompt="Volcano", model="gemini-1.5-pro") # Forbidden model check
    assert "unsupported" in str(exc.value)


def test_invalid_4k_compatibility_for_wrong_model():
    """Asserts that configuring 4k with Veo Lite raises validation errors."""
    with pytest.raises(ValidationError) as exc:
        VideoConfig(
            prompt="Supernovas colliding",
            model="veo-3.1-lite-generate-preview",
            resolution="4k"
        )
    assert "4K resolution is only supported by veo-3.1-generate-preview" in str(exc.value)
