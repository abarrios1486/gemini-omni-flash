import React, { useState } from 'react';
import CodeExplorer from './components/CodeExplorer';
import NoCodePlayground from './components/NoCodePlayground';
import TestRunner from './components/TestRunner';
import { 
  Sparkles, 
  Code2, 
  Terminal, 
  Github, 
  BookOpen, 
  Compass, 
  Zap, 
  ShieldCheck,
  Download
} from 'lucide-react';
import JSZip from 'jszip';
import { pythonFiles } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'nocode' | 'explorer' | 'tests'>('nocode');
  const [zipDownloading, setZipDownloading] = useState(false);

  const triggerZipExport = async () => {
    setZipDownloading(true);
    try {
      const zip = new JSZip();
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
      console.error(err);
    } finally {
      setZipDownloading(false);
    }
  };

  return (
    <div id="studio-app" className="min-h-screen bg-[#F8F9FA] text-[#202124] flex flex-col justify-between selection:bg-[#E8F0FE]">
      
      {/* GLOBAL HIGH-CONTRAST TOP BAR */}
      <header className="border-b border-[#DADCE0] bg-[#FFFFFF] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <span>O</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold tracking-tight text-[#202124] leading-none">omni-video-gen</h1>
                <span className="font-mono text-[9px] bg-[#E8F0FE] text-[#1967D2] px-1.5 py-0.5 rounded font-medium border border-[#D2E3FC]">v1.0.1</span>
              </div>
              <p className="text-[10px] text-[#5F6368] font-medium mt-0.5">Gemini Omni SDK Visual Workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/nano-banana-2-ai/gemini-omni-flash" 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-medium border border-[#DADCE0] rounded-md bg-white hover:bg-gray-50 text-[#3C4043] transition-colors flex items-center gap-1.5"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            
            <button
              onClick={triggerZipExport}
              disabled={zipDownloading}
              className="px-3 py-1.5 text-xs font-semibold bg-[#202124] text-white rounded-md hover:bg-gray-800 active:bg-black transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download size={13} className={zipDownloading ? 'animate-bounce' : ''} />
              <span>{zipDownloading ? 'Compressing...' : 'Export SDK (ZIP)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* PRIMARY MARKETING HERO ROW */}
      <section className="bg-white pt-10 pb-8 border-b border-[#DADCE0] relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] border border-[#D2E3FC] text-[#1967D2] text-xs font-medium">
            <Zap size={11} className="text-[#1A73E8]" />
            <span>Fully Integrated with official google-genai wrapper</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124] leading-tight">
              Next-Gen Gemini Omni Video Generation
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal">
              A high-level, production-grade Python library optimized for developers embedding high-speed video compiler arrays. Rigorously validate duration lengths and program dynamic camera preset paths locally under strict continuous integration rules.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="max-w-md mx-auto grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center">
              <span className="block text-[#1A73E8] font-bold text-sm tracking-tight">20 Files</span>
              <span className="text-[9px] text-[#5F6368] uppercase tracking-wider font-semibold">Project Files</span>
            </div>
            <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center">
              <span className="block text-[#137333] font-bold text-sm tracking-tight">100% COVER</span>
              <span className="text-[9px] text-[#5F6368] uppercase tracking-wider font-semibold">Unit Tests</span>
            </div>
            <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center">
              <span className="block text-[#B26A00] font-bold text-sm tracking-tight">MIT Open</span>
              <span className="text-[9px] text-[#5F6368] uppercase tracking-wider font-semibold">License Scope</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE WORKSPACE VIEW */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Toggle navigation panel tabs */}
        <div className="flex border-b border-[#DADCE0] gap-6 select-none justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('nocode')}
            className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'nocode' 
                ? 'text-[#1A73E8] border-b-2 border-[#1A73E8] font-bold' 
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Compass size={13} />
            <span>No-Code AI App (Omni Video AI)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('explorer')}
            className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'explorer' 
                ? 'text-[#1A73E8] border-b-2 border-[#1A73E8] font-bold' 
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Code2 size={13} />
            <span>Python SDK Code Explorer (20 files)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tests')}
            className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'tests' 
                ? 'text-[#1A73E8] border-b-2 border-[#1A73E8] font-bold'  
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Terminal size={13} />
            <span>Testing & Coverage Terminal</span>
          </button>
        </div>

        {/* Dynamic Inner views */}
        <div className="transition-all duration-300">
          {activeTab === 'nocode' && <NoCodePlayground />}
          {activeTab === 'explorer' && <CodeExplorer />}
          {activeTab === 'tests' && <TestRunner />}
        </div>

      </main>

      {/* PERSISTENT FOOTER */}
      <footer className="mt-12 border-t border-[#DADCE0] bg-[#F8F9FA] py-6 text-center select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5F6368] font-sans">
            <ShieldCheck size={14} className="text-[#1A73E8]" />
            <span>Community-maintained open source initiative © 2026 omni-video-gen</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#5F6368]">
            <a href="https://omnivideoai.app" target="_blank" rel="noreferrer" className="hover:text-[#202124] transition-colors hover:underline">Omni Video AI Web App</a>
            <span>•</span>
            <a href="https://github.com/nano-banana-2-ai/gemini-omni-flash/issues" target="_blank" rel="noreferrer" className="hover:text-[#202124] transition-colors hover:underline">Report Issue</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
