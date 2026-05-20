#!/usr/bin/env python3
"""
Example showing Gemini Omni multimodal capabilities, feeding a starting image and ending image
into the generator to execute a bounded, physics-respecting frame transition.
"""

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
    main()
