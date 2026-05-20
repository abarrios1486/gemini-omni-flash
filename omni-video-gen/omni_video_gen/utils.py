"""
Core utility functions for handling base64 encoding, temporary asset rendering, and verification helpers.
"""

import base64
import os
from typing import Union, Dict, Any
from PIL import Image
from io import BytesIO
from omni_video_gen.exceptions import InvalidConfigError

def encode_image_to_base64(image_input: Union[str, bytes, Image.Image]) -> tuple[str, str]:
    """
    Parses various image formats and encodes them into standard base64 strings with MIME types.

    Args:
        image_input: Path to an image, raw image bytes, or a PIL Image instance.

    Returns:
        A tuple of (base64_string, mime_type) compatible with the Gemini API.

    Raises:
        InvalidConfigError: If the format is unreadable or unsupported.
    """
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
    """
    Writes raw binary bytes of a compiled video back onto a local disc path.

    Args:
        video_bytes: Binary data of the compiled MP4 container.
        output_path: Target directory and file path.

    Returns:
        The verified absolute path of the written file.
    """
    directory = os.path.dirname(output_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
        
    with open(output_path, "wb") as video_file:
        video_file.write(video_bytes)
        
    return os.path.abspath(output_path)
