# 🎬 Gemini Omni Video Generator: Web Workspace & Python SDK 🌌

<div align="center">

[![Website](https://img.shields.io/badge/Official_Website-omnivideoai.app-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://omnivideoai.app)
[![GitHub Star](https://img.shields.io/github/stars/nano-banana-2-ai/gemini-omni-flash?style=for-the-badge&logo=github)](https://github.com/nano-banana-2-ai/gemini-omni-flash)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>The ultimate open-source, dual-layer portal integrating Gemini Omni, Gemini Omni Flash, and Veo video synthesis ecosystems. Powered by Google's next-generation LLM technology.</b>
</p>

</div>

---

## ⚡ Index & Repository Architecture

This repository is designed as a **two-in-one unified workspace** addressing both ready-to-use visuals and high-performance Python backend scripts:

```text
📂 gemini-omni-flash (git repository root)
├── 🌐 / (Root Directory) -> Visual Interactive Web Workspace: A high-performance React + Vite + Tailwind interface
│   ├── src/                    # React frontend components, dashboard, & editor pages
│   ├── package.json            # React workspace environment dependencies
│   └── vite.config.ts          # Vite asset pipeline configuration
│
└── 🐍 /omni-video-gen -> Core Python SDK: A professional, type-safe library to invoke multimodal Veo video synthesis
    ├── omni_video_gen/         # Python library source code (Models, client, parameters)
    ├── examples/               # One-click executable Python setup examples
    ├── setup.py                # Pip package deployment & configuration script
    └── tests/                  # PyTest automated unit tests suite (CI validation)
```

---

## 🌐 Part A: Interactive Web Workspace (Frontend React UI)

The root folder contains a sleek, state-of-the-art interactive **Gemini Omni App** workspace constructed in **React 18 + Vite + Tailwind CSS**.

### Key Web Features:
- 🎬 **Dynamic Studio Deck**: Drag-and-drop scene builders, camera preset selectors (Pan, Zoom, Tilt, Orbit), and visual storyboard pipelines.
- ⚙️ **Gemini & Veo Playground**: Live response simulators, duration adjustments, aspect ratio controllers (`16:9`, `9:16`, `1:1`), and output resolution presets.
- 🐍 **Active SDK Code Exporter**: Generates a drop-in, fully customized, Pydantic-validated Python script on-the-fly based on your visual sidebar configurations.
- 🧪 **CI Pipeline Simulator**: Built-in interactive bash terminal simulation running mock pytest suites, Black checks, and MyPy static compliance.

### Local Development Setup:
1. Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Boot up the local web service:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:3000` to interact with the environment.

---

## 🐍 Part B: Python SDK (`omni-video-gen`)

An industry-grade, lightweight, type-safe wrapper for the **Gemini Omni API**. Perfect for developer pipelines, automated rendering scripts, and machine learning backend processes.

Detailed instructions are archived inside the [Python SDK Subdirectory README](./omni-video-gen/README.md).

### Quick Commands:
1. **Installation via Pip**:
   ```bash
   pip install ./omni-video-gen
   ```
2. **Minimal Text-to-Video Workflow**:
   ```python
   from omni_video_gen import OmniVideoGenerator

   generator = OmniVideoGenerator(api_key="YOUR_GEMINI_API_KEY")
   result = generator.generate_video(
       prompt="Cinematic shot of neon rain reflecting on futuristic streets, cyberpunk theme, 4k",
       model="veo-3.1-generate",
       aspect_ratio="16:9",
       output_path="cyberpunk_street.mp4"
   )
   print(f"Video created: {result.download_url}")
   ```

---

## 📚 Gemini Omni & Video AI Search Index & Comparison (SEO Suite)

To assist developers researching modern Multimodal AI models, continuous intelligence, and prompt video scaling, we cross-reference key technical concepts, rates, and search directions here.

### 🔍 Industry Comparisons: Gemini Omni vs Veo
*   **Gemini Omni**: Refers to Google's native end-to-end multimodal capability (seamlessly parsing text, image, audio, and cinematic frames instantly as single high-frequency vectors). Often referred to as **Google Omni** or **Gemini Flow** for real-time video sequencing.
*   **Google Veo / Veo 3.1 / Gemini Veo 3 Free**: The dedicated premier video generation intelligence engine. This SDK wraps both, allowing developers to configure lightweight previews using **Gemini Omni Flash** and trigger maximum cinematic detail rendering on Veo models.
*   **Gemini 3.5 Flash** & **Gemini 3.2 Flash**: Real-time high-efficiency pipelines serving as the backbone wrapper for rapid storyboarding, smart auto-tagging, multimodal narrative text prompts, and swift parameter validations.

---

### ❓ FAQ & Common Searches Reference

#### 1. What are the key advantages of a custom Gemini Omni App compared to standard interfaces?
Building a dedicated visual workbench like [omnivideoai.app](https://omnivideoai.app) allows creators to visually direct layouts, generate automated camera movements, manage timeline frames (I2V/T2V), and export production-ready code blocks tailored for Android pipelines, web hosting platforms, or high-performance Python servers.

#### 2. How does the Gemini Omni API compare to other workspace apps?
Unlike static email integrations or general workspace tools (such as **Gmail Gemini AI features** or **Gemini Deep Research** systems), this dedicated API focuses 100% on spatial narrative, frame composition, video generation pipelines, and camera control matrices.

#### 3. Are there rate cards and developer benchmarks available for the model?
Yes. You can consult pricing tables and model rate comparisons (**Gemini rates** & **Benefits of Gemini Advanced** packages) directly on the official developer portals, or download comparative logs via the community benchmarks repository.

---

### 🏷️ Search Semantic Mapping & Common Typing Synonyms
For index crawlers searching for standard, advanced, or typo-variant keywords:
*   **Model Classifiers**: `gemini-omni-model`, `gemini-omni-api`, `gemini-omni-flash`, `gemini-spark`, `gemini-video-generation`, `gemini-ai-video-generator`.
*   **Developer Environments**: `gemini-omni-flash-android`, `gemini-omni-youtube-exporter`, `gemini-flow-pipelines`.
*   **Popular Research Terms**: `gemini-advanced-models`, `benefits-of-gemini-advanced`, `gemini-deep-research-price-performance`.
*   **Common Typos & Search Variations**: `giminin`, `gemina-pro`, `google-omni-free-tier`.
*   **Community Forums**: Find active threads reviewing real-world generations and sharing scripts on [Reddit](https://www.reddit.com/) by searching `gemini-omni on reddit` (r/GoogleGeminiAI).

---

## 🛠️ Contribution & Issue Tracking

Got a feature suggestion, bug report, or looking to augment our camera tracking matrices? 
- **Website**: [omnivideoai.app](https://omnivideoai.app)
- **Bug Reports & Issues**: [gemini-omni-flash Issues](https://github.com/nano-banana-2-ai/gemini-omni-flash/issues)
- **Discussion Forums**: [GitHub Discussions](https://github.com/nano-banana-2-ai/gemini-omni-flash/discussions)

Created with ❤️ by the **OmniVideoAI Open-source Community**. Licensed under the [MIT License](LICENSE).
