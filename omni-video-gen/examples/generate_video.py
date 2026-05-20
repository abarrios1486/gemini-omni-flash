#!/usr/bin/env python3
"""
Brief and powerful example showing how to trigger video generation with 'omni-video-gen' in a single command.
Ensure you have 'GEMINI_API_KEY' set in your environment before execution.
"""

from omni_video_gen import OmniVideoGenerator

def main():
    print("Initializing OmniVideoGenerator using local credentials...")
    # This automatically loads GEMINI_API_KEY from the system environment keys
    generator = OmniVideoGenerator()

    # Define the visual prompt (SEO keywords: Gemini Omni, Video Generation, Flash 3.5)
    prompt = "A high-speed neon sports car weaving through a dystopian sci-fi city under heavy rain, 4k resolution, cinematic lighting"

    print(f"Triggering Gemini Omni API video generation pipeline...")
    print(f"Visual prompt: '{prompt}'...")

    try:
        # Trigger one-click generation and download
        result = generator.generate_video(
            prompt=prompt,
            model="veo-3.1-lite-generate-preview", # Uses Flash-driven Veo Lite
            resolution="720p",
            aspect_ratio="16:9",
            output_path="output_cinematic_neon_car.mp4"
        )

        print("\nSUCCESS! Video generated and compiled successfully.")
        print(f"Operation ID: {result.operation_name}")
        print(f"Local file saved at: {result.download_url}")
        print(f"Visual details: {result.metadata}")

    except Exception as e:
        print(f"\nFailed to generate video: {e}")
        print("Tip: Double-check your Gemini API key in the Secrets Panel.")

if __name__ == "__main__":
    main()
