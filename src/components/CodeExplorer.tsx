import React, { useState } from 'react';
import { repositoryTree, pythonFiles } from '../data';
import { FileNode, PyFile } from '../types';
import JSZip from 'jszip';
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState<PyFile>(pythonFiles[0]);
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({
    "": true, // Root
    "omni_video_gen": true,
    "examples": true,
  });
  const [copied, setCopied] = useState(false);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDirectory = (path: string) => {
    setExpandedDirs(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerZipExport = async () => {
    setZipDownloading(true);
    try {
      const zip = new JSZip();
      
      // Load all 20 actual library files into the jszip buffer matching directory tree
      pythonFiles.forEach(file => {
        zip.file(file.path, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'omni-video-gen-v1.0.1.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to build ZIP file:", err);
    } finally {
      setZipDownloading(false);
    }
  };

  // Directory Tree Renderer
  const renderTree = (node: FileNode, depth = 0) => {
    const isDir = node.type === 'directory';
    const isExpanded = expandedDirs[node.path];
    const paddingLeft = `${depth * 12 + 6}px`;

    return (
      <div key={node.path || node.name} className="select-none">
        {isDir ? (
          <div>
            <div 
              onClick={() => toggleDirectory(node.path)}
              className="flex items-center gap-2 py-1 px-2 text-[#3C4043] hover:text-[#202124] hover:bg-[#E8EAED] rounded cursor-pointer transition text-sm"
              style={{ paddingLeft }}
            >
              <span className="text-[#5F6368]">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
              <span className="text-[#1A73E8]">
                {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              </span>
              <span className="font-medium truncate">{node.name}</span>
            </div>
            {isExpanded && node.children && (
              <div className="mt-0.5">
                {node.children.map(child => renderTree(child, depth + 1))}
              </div>
            )}
          </div>
        ) : (
          <div 
            onClick={() => node.fileData && setSelectedFile(node.fileData)}
            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition text-sm ${
              selectedFile.path === node.path 
                ? 'bg-[#E8F0FE] text-[#1967D2] border-l-2 border-[#1A73E8] font-medium' 
                : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
            }`}
            style={{ paddingLeft: `${depth * 12 + 20}px` }}
          >
            <span className={node.name.endsWith('.md') ? 'text-[#B26A00]' : 'text-[#137333]'}>
              {node.name.endsWith('.md') ? <FileText size={15} /> : <FileCode size={15} />}
            </span>
            <span className="truncate">{node.name}</span>
          </div>
        )}
      </div>
    );
  };

  const filteredFiles = searchQuery 
    ? pythonFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : pythonFiles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#DADCE0] rounded-2xl overflow-hidden shadow-sm">
      
      {/* LEFT COLUMN: Sidebar Navigation & Tree Browser */}
      <div className="lg:col-span-4 bg-[#F8F9FA] p-5 flex flex-col border-r border-[#DADCE0]">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 rounded bg-[#E8F0FE] text-[#1967D2] text-xs font-semibold py-0.5 uppercase tracking-wide border border-[#D2E3FC]">
                Library Code
              </span>
              <h3 className="font-semibold text-[#202124] text-sm">Python Source</h3>
            </div>
            <button
              onClick={triggerZipExport}
              disabled={zipDownloading}
              className="flex items-center gap-1.5 bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#103F7A] disabled:bg-[#F1F3F4] disabled:text-[#3C4043] text-white font-medium text-xs px-2.5 py-1.5 rounded-lg shadow-sm cursor-pointer transition duration-150"
            >
              <Download size={13} className={zipDownloading ? 'animate-bounce' : ''} />
              {zipDownloading ? 'Exporting...' : 'Export ZIP'}
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 text-[#5F6368]" size={14} />
            <input
              type="text"
              placeholder="Search SDK files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs text-[#202124] bg-white hover:bg-gray-50 focus:bg-white placeholder-[#5F6368] rounded-lg border border-[#DADCE0] focus:outline-none focus:border-[#1A73E8] transition-colors"
            />
          </div>
        </div>

        {/* Tree Explorer Container */}
        <div className="flex-1 overflow-y-auto max-h-[480px] space-y-1 bg-white p-2.5 rounded-xl border border-[#DADCE0]">
          {searchQuery ? (
            <div className="space-y-1">
              <div className="text-[10px] text-[#5F6368] px-2 py-1 uppercase tracking-wider">Search Results</div>
              {filteredFiles.map(file => (
                <div 
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`flex items-center gap-2 py-1.5 px-2.5 rounded cursor-pointer transition text-xs ${
                    selectedFile.path === file.path 
                      ? 'bg-[#E8F0FE] text-[#1967D2]' 
                      : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
                  }`}
                >
                  <FileCode size={13} className="text-[#137333]" />
                  <div className="flex-1 truncate">
                    <span className="font-medium text-[#202124] block text-[11px]">{file.name}</span>
                    <span className="text-[10px] text-[#5F6368] block truncate">{file.path}</span>
                  </div>
                </div>
              ))}
              {filteredFiles.length === 0 && (
                <div className="p-4 text-center text-xs text-[#5F6368]">No matching keywords found.</div>
              )}
            </div>
          ) : (
            repositoryTree.map(node => renderTree(node))
          )}
        </div>

        {/* Metadata Brief Box */}
        <div className="mt-4 p-3 bg-[#E8F0FE]/50 border border-[#D2E3FC] rounded-xl">
          <h4 className="text-xs font-semibold text-[#1967D2] flex items-center gap-1.5 mb-1">
            <Cpu size={12} />
            File Insights
          </h4>
          <p className="text-[11px] text-[#5F6368] leading-relaxed">
            {selectedFile.description}
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Code View Area */}
      <div className="lg:col-span-8 flex flex-col bg-white">
        
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between bg-[#F8F9FA] p-3 border-b border-[#DADCE0]">
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="bg-white text-[#1967D2] text-xs px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#DADCE0] flex items-center gap-2 select-none font-medium">
              <span className={selectedFile.name.endsWith('.md') ? 'text-[#B26A00]' : 'text-[#137333]'}>
                {selectedFile.name.endsWith('.md') ? <FileText size={13} /> : <FileCode size={13} />}
              </span>
              <span className="font-mono">{selectedFile.name}</span>
              <span className="text-[9px] bg-[#E8F0FE] text-[#1967D2] px-1.5 py-0.5 rounded ml-1 uppercase border border-[#D2E3FC]">
                {selectedFile.language}
              </span>
            </div>
          </div>

          <button
            onClick={copyCodeToClipboard}
            className="p-1.5 px-3 rounded-md bg-white hover:bg-gray-50 border border-[#DADCE0] text-[#3C4043] hover:text-[#202124] text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
            title="Copy source details to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#137333]" />
                <span className="text-[#137333] text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span className="text-[11px]">Copy Source</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Syntax Colored Viewport */}
        <div className="p-4 bg-[#202124] overflow-x-auto max-h-[520px] h-[520px] font-mono text-xs leading-relaxed text-[#F8F9FA] relative">
          <pre className="m-0 select-all selection:bg-blue-900/50">
            <code>
              {selectedFile.content.split('\n').map((line, idx) => {
                // Extremely lightweight regular expressions to add subtle coding keywords syntax styling for readability
                let highlighted = line
                  .replace(/(""".*?"""|'''.*?''')/g, '<span class="text-[#a8c7fa] italic">$1</span>') // Docstrings
                  .replace(/(#.*)$/g, '<span class="text-[#9aa0a6] italic">$1</span>') // Comments
                  .replace(/\b(import|from|def|class|return|if|else|try|except|as|with|for|in|not|is|raise|import|from|del|pass|lambda)\b/g, '<span class="text-[#8ab4f8] font-semibold">$1</span>') // Keywords
                  .replace(/\b(OmniVideoGenerator|VideoConfig|VideoGenerationResult|GoogleGenAI|urllib|time|os|base64|Pydantic|BaseModel|Field|ValidationError)\b/g, '<span class="text-[#d7aefb]">$1</span>') // Classes
                  .replace(/(["'].*?["'])/g, '<span class="text-[#fdd663]">$1</span>') // Strings
                  .replace(/\b(validate_model|validate_aspect_ratio|validate_resolution|encode_image_to_base64|generate_video|create_video_operation|check_operation_status|download_video_bytes|print|len|open|read|write|set)\b/g, '<span class="text-[#ff8bcb]">$1</span>'); // Methods

                return (
                  <div key={idx} className="flex hover:bg-white/5 px-1 py-0.5 rounded transition">
                    <span className="text-gray-500 w-8 select-none border-r border-[#3C4043] mr-4 text-right pr-2 text-[10px]">{idx + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Navigation Info Footer */}
        <div className="bg-[#F8F9FA] px-4 py-2.5 border-t border-[#DADCE0] text-[#5F6368] font-mono text-[10px] flex justify-between items-center">
          <span>Path: omni-video-gen/{selectedFile.path}</span>
          <span>Size: {(selectedFile.content.length / 1024).toFixed(2)} KB</span>
        </div>

      </div>
    </div>
  );
}
