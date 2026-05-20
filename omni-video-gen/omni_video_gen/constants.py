"""
Constants definitions for standard Gemini Omni API models, resolutions, camera styles, and default variables.
"""

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
DEFAULT_POLL_INTERVAL_SECONDS = 10  # Check status every 10 seconds
