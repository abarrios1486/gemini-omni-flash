"""
Custom Exceptions for the omni_video_gen library, allowing clean downstream error identification.
"""

class OmniVideoGenError(Exception):
    """Base exception for all errors raised during Gemini Omni Video Generation operations."""
    pass


class ApiKeyMissingError(OmniVideoGenError):
    """Exception raised when the Gemini API Key is missing or invalid in environment setup."""
    pass


class InvalidConfigError(OmniVideoGenError):
    """Exception raised when configuration parameters or video inputs (e.g. aspect ratio, model) fail validation."""
    pass


class GenerationTimeoutError(OmniVideoGenError):
    """Exception raised when the Gemini Omni Video generation request exceeds the configured polling limits."""
    pass
