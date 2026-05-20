"""
Tests checking consistency in custom Exceptions raised.
"""

from omni_video_gen.exceptions import (
    OmniVideoGenError,
    ApiKeyMissingError,
    InvalidConfigError,
    GenerationTimeoutError,
)


def test_exception_inheritance():
    """Asserts that custom exceptions properly derive from the OmniVideoGenError parent."""
    assert issubclass(ApiKeyMissingError, OmniVideoGenError)
    assert issubclass(InvalidConfigError, OmniVideoGenError)
    assert issubclass(GenerationTimeoutError, OmniVideoGenError)


def test_exception_messages():
    """Asserts that raising and catching a custom exception correctly propagates strings."""
    try:
        raise InvalidConfigError("Missing parameter: duration_seconds")
    except OmniVideoGenError as e:
        assert str(e) == "Missing parameter: duration_seconds"
