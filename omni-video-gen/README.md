# 🌌 omni-video-gen

[![PyPI Version](https://img.shields.io/badge/pypi-v1.0.1-blue.svg)](https://pypi.org)
[![Python Support](https://img.shields.io/badge/python-3.9%20%7C%203.10%20%7C%203.11%20%7C%203.12-green.svg)](https://pypi.org)
[![Build Status](https://img.shields.io/badge/CI-passing-brightgreen.svg)](https://github.com/nano-banana-2-ai/gemini-omni-flash/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A professional, team-maintained, type-safe Python SDK wrapping Google's next-generation **Gemini Omni API (Flash 3.5 & Veo 3.1)** algorithms. Built specifically for developers looking to integrate world-class AI video generation pipeline workflows with a single line of Python code.

---

## ✨ Core Features

*   **⚡ Flash-Powered Speed:** Leverages **Gemini Flash 3.5** and Veo-Lite engines to compile high-quality video files in seconds rather than minutes.
*   **👁️ True Multimodal Input:** Synthesize high-definition clips starting from text prompts, static reference frames (Image-to-Video), or bound transitions (Starting image -> Ending image integration).
*   **🎬 Comprehensive Camera Presets:** Program precise scene movements (Pan, Zoom, Tilt, and Rotation tracking presets) directly through structured configurations.
*   **🛠️ Robust Pydantic Validations:** Eliminate runtime remote API errors by validating resolutions (`720p`, `1080p`, `4k`), durations, and aspect ratios (`16:9`, `9:16`) locally beforehand.
*   **🔒 Secure Operations Architecture:** Implements a compliant three-step secure dispatch, poll, and stream logic to shield API keys from exposure or memory leak concerns.

---

## ⚡ Quick Start & Installation

Install the library directly using standard `pip`:

```bash
pip install omni-video-gen
```

Ensure you have your Gemini API credentials configured in your environment:

```bash
export GEMINI_API_KEY="your_api_key_here"
```

---

## 🚀 Minimal One-Click Example

Here is how you can compile a beautiful cinematic video with a single block:

```python
from omni_video_gen import OmniVideoGenerator

# 1. Initialize generator (implicitly picks up GEMINI_API_KEY from environment)
generator = OmniVideoGenerator()

# 2. Trigger high-speed synthesis and save the result
result = generator.generate_video(
    prompt="A detailed drone shot tracking a speed-boat cutting through emerald-green waters during a tropical sunrise",
    model="veo-3.1-lite-generate-preview",
    resolution="720p",
    output_path="outputs/tropical_sunrise_boat.mp4"
)

print(f"Success! Saved video at: {result.download_url}")
print(f"Underlying Operation ID: {result.operation_name}")
```

For advanced scripts (multimodal image-to-video framing or clip extensions), reference the files inside the `examples/` directory.

---

## 🏗️ Community Maintenance & CI/CD

This package is actively maintained by the open-source community. Contributions and bug reports are highly welcome.
Our workflows guarantee absolute reliability:
*   **Continuous Integration:** Automatic testing against Python `3.9` through `3.12` on every PR.
*   **Type Safety:** Absolute coverage check under strict `mypy` configurations.
*   **Linting:** Consistent formatting styles enforced by `black` standards.

To execute the test suite locally:
```bash
pip install -e .[dev]
pytest
```

---

## 🌐 No-Code Alternative: Omni Video AI Web App

Are you looking for a plug-and-play visual interface instead of building Python files from scratch?

We highly recommend **Omni Video AI Web App**, the official, out-of-the-box UI complement to our SDK. 

*   **Ideal for Creators & Designers:** No code or environment setup needed. Generates beautiful cinematic video files instantly through an interactive visual workspace.
*   **Advanced Storyboard Deck:** Sketch prompts, preview keyframes, arrange scene timelines, and stream rendered MP4 assets smoothly directly inside your web explorer.
*   **Seamless Integration:** Perfectly compatible with templates generated here. Export your web-crafted configurations into python-ready scripts anytime!

👉 **[Launch Omni Video AI Web App now](https://omnivideoai.app)** to explore Gemini Omni's magnificent video possibilities in real-time.
