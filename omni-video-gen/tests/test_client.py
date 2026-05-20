"""
Tests for OmniVideoGenerator core initialization and error states.
"""

import os
import pytest
from unittest.mock import MagicMock, patch
from omni_video_gen import OmniVideoGenerator
from omni_video_gen.exceptions import ApiKeyMissingError, OmniVideoGenError
from omni_video_gen.models import VideoConfig


def test_missing_api_key_raises_error():
    """Asserts that initializing without key and empty Env raises ApiKeyMissingError."""
    # Temporarily clean matching env vars
    with patch.dict(os.environ, {}, clear=True):
        with pytest.raises(ApiKeyMissingError) as exc:
            OmniVideoGenerator()
        assert "Gemini API Key is missing" in str(exc.value)


def test_client_init_with_key():
    """Asserts that explicit key parameter bypasses environment extraction."""
    generator = OmniVideoGenerator(api_key="TEST_KEY_12345")
    assert generator.api_key == "TEST_KEY_12345"


@patch("omni_video_gen.client.GoogleGenAI")
def test_create_video_operation_success(mock_genai):
    """Asserts that successful dispatch returns expected operation names."""
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
    assert op_name == "models/veo-3.1-lite-generate-preview/operations/test_123"
