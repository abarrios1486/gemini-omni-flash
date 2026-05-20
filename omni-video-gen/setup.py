import os
from setuptools import setup, find_packages

# Read the contents of your README file
with open("README.md", encoding="utf-8") as f:
    long_description = f.read()

setup(
    name="omni-video-gen",
    version="1.0.1",
    author="OmniVideoAI Team",
    author_email="dev@omnivideoai.app",
    description="A professional, community-maintained Python SDK for next-generation multimodal video synthesis leveraging Google's Gemini Omni API, Flash 3.5, and Veo models.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/nano-banana-2-ai/gemini-omni-flash",
    project_urls={
        "Bug Tracker": "https://github.com/nano-banana-2-ai/gemini-omni-flash/issues",
        "Documentation": "https://github.com/nano-banana-2-ai/gemini-omni-flash/wiki",
        "Commercial Alternative": "https://omnivideoai.app",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Multimedia :: Video",
    ],
    keywords=[
        "Gemini Omni",
        "Video Generation",
        "Flash 3.5",
        "Veo 3.1",
        "Google Generative AI",
        "Multimodal AI",
        "Text to Video",
        "Image to Video",
        "AI Video Production",
    ],
    package_dir={"": "."},
    packages=find_packages(exclude=["tests*", "examples*"]),
    python_requires=">=3.9",
    install_requires=[
        "google-genai>=1.29.0",
        "pydantic>=2.0.0",
        "pillow>=9.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black>=23.0.0",
            "mypy>=1.0.0",
            "isort>=5.10.0",
            "pytest-cov>=4.0.0",
        ],
    },
)
