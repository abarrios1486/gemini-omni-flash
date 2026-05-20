"""
Tests for checking visual and binary content conversion helper functions under omni_video_gen/utils.py.
"""

import pytest
from omni_video_gen.utils import encode_image_to_base64
from omni_video_gen.exceptions import InvalidConfigError


def test_invalid_type_raises_config_error():
    """Asserts that sending unparseable objects like integer arrays causes clean errors."""
    with pytest.raises(InvalidConfigError) as exc:
        encode_image_to_base64(12345) # type: ignore
    assert "Unsupported image format input" in str(exc.value)


def test_missing_string_path_raises_config_error():
    """Asserts that pointing to a nonexistent file path causes errors."""
    with pytest.raises(InvalidConfigError) as exc:
        encode_image_to_base64("this_file_does_not_exist_anywhere.png")
    assert "Image reference file not found" in str(exc.value)


def test_raw_bytes_conversion_succeeds():
    """Asserts that binary raw image arrays return standard formatted base64 strings."""
    dummy_input = b"fake_png_header_and_pixels"
    b64_str, mime = encode_image_to_base64(dummy_input)
    assert mime == "image/png"
    assert len(b64_str) > 0
