export interface PyFile {
  name: string;
  path: string;
  description: string;
  language: string;
  content: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  fileData?: PyFile;
}

export interface StoryboardScene {
  id: number;
  title: string;
  duration: string;
  prompt: string;
  cameraMotion: string;
  narration: string;
  imageUrl: string;
  colorTheme: string;
}

export interface CliLog {
  text: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'cmd';
  timestamp: string;
}
