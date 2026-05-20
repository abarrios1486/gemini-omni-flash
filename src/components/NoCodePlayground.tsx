import React, { useState, useEffect } from 'react';
import { preseededStoryboards } from '../data';
import { StoryboardScene } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Video, 
  Camera, 
  Image as ImageIcon, 
  HelpCircle, 
  Code2, 
  Maximize2,
  Workflow,
  CheckCircle2,
  Loader2,
  Layers
} from 'lucide-react';

export default function NoCodePlayground() {
  const [prompt, setPrompt] = useState('A fast neon sports car weaving through dystopian rain lanes at sunset, cybernetic grid');
  const [model, setModel] = useState('veo-3.1-lite-generate-preview');
  const [resolution, setResolution] = useState('720p');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [cameraMotion, setCameraMotion] = useState('zoom_in');
  
  // Starting / Ending image mock attachments
  const [startAttached, setStartAttached] = useState(false);
  const [endAttached, setEndAttached] = useState(false);

  // States for generation compilation
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [activeStory, setActiveStory] = useState<StoryboardScene[] | null>(null);
  
  // States for Video Timeline Simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 12 seconds
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const compilationSteps = [
    "Reading parameters and initializing local validation layers...",
    "Validating model limits & verifying 4K aspect compatibility...",
    "Establishing high-speed asynchronous hook with Gemini Omni API...",
    "Gemini Flash 3.5 multi-modal storyboarding sequence activated...",
    "Mapping camera tracking angles and rendering frame buffers...",
    "Decryption phase completo! Core stream sequence established."
  ];

  // Run Compilation Loop
  const handleCompile = () => {
    setIsCompiling(true);
    setCompileStep(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveSceneIndex(0);

    const interval = setInterval(() => {
      setCompileStep(prev => {
        if (prev >= compilationSteps.length - 1) {
          clearInterval(interval);
          
          // Match prompt keywords to seed appropriate storyboards or fall back gracefully
          const lowercasePrompt = prompt.toLowerCase();
          let matchedKey = 'abstract';
          if (lowercasePrompt.includes('car') || lowercasePrompt.includes('neon') || lowercasePrompt.includes('scifi') || lowercasePrompt.includes('dystopian') || lowercasePrompt.includes('city')) {
            matchedKey = 'scifi';
          } else if (lowercasePrompt.includes('boat') || lowercasePrompt.includes('lake') || lowercasePrompt.includes('sea') || lowercasePrompt.includes('nature') || lowercasePrompt.includes('sunset')) {
            matchedKey = 'nature';
          }
          
          setActiveStory(preseededStoryboards[matchedKey]);
          setIsCompiling(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1200);
  };

  // Video Timeline Tick Loop
  useEffect(() => {
    let animationFrame: number;
    
    if (isPlaying && activeStory) {
      const updateTimeline = () => {
        setCurrentTime(prev => {
          const nextSec = prev + 0.1;
          if (nextSec >= 12) {
            setIsPlaying(false);
            return 12;
          }
          return nextSec;
        });
        animationFrame = requestAnimationFrame(updateTimeline);
      };
      animationFrame = requestAnimationFrame(updateTimeline);
    }
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, activeStory]);

  // Map Current Time (0-12s) to Active Story Scene (0, 1, or 2)
  useEffect(() => {
    if (currentTime < 4) {
      setActiveSceneIndex(0);
    } else if (currentTime < 8) {
      setActiveSceneIndex(1);
    } else {
      setActiveSceneIndex(2);
    }
  }, [currentTime]);

  const activeScene = activeStory ? activeStory[activeSceneIndex] : null;

  // Auto-generate Python block corresponding to UI options
  const generatedSdkCode = `from omni_video_gen import OmniVideoGenerator, VideoConfig

# Automated output mapping matching Omni Video AI UI configs
generator = OmniVideoGenerator()

config = VideoConfig(
    model="${model}",
    prompt="${prompt}",
    resolution="${resolution}",
    aspect_ratio="${aspectRatio}",
    camera_motion="${cameraMotion || 'None'}"
)

# Start secure 3-stage clip compile
op_name = generator.create_video_operation(
    config=config,
    starting_image=${startAttached ? 'PIL_Image' : 'None'},
    ending_image=${endAttached ? 'PIL_Image' : 'None'}
)
print(f"Task dispatched with Operation ID: {op_name}")
`;

  return (
    <div className="space-y-6">
      
      {/* Dynamic Recommendation Header */}
      <div className="bg-[#F1F3F4] border-l-4 border-[#1A73E8] p-5 md:p-6 rounded-r-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
          <div className="p-3 bg-[#E8F0FE] text-[#1967D2] rounded-xl border border-[#D2E3FC]">
            <Workflow size={24} />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] bg-[#E8F0FE] text-[#1967D2] px-2.5 py-0.5 rounded font-semibold uppercase tracking-wide border border-[#D2E3FC]">
                No-Code Alternative
              </span>
              <h2 className="text-base font-bold text-[#202124]">Omni Video AI Web Workspace</h2>
            </div>
            <p className="text-xs text-[#3C4043] leading-relaxed">
              <strong>Omni Video AI</strong> is the out-of-the-box web-based companion app to our Python package. It is designed specifically for content creators and designers who prefer a simple drag-and-drop workspace over editing coding frameworks. This companion operates entirely in the cloud, allowing developers or creators to sketch ideas visually and instantly export completed variables into python scripts on the fly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COMPILER: Visual Options Prompting Pane */}
        <div className="lg:col-span-5 bg-white border border-[#DADCE0] rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DADCE0]">
            <Video size={16} className="text-[#1A73E8]" />
            <span className="font-semibold text-[#202124] text-xs uppercase tracking-wider font-sans">Prompters & Controls</span>
          </div>

          {/* Prompt Entry Area */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold">Visual Prompt Sequence</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What should the visual narrative represent..."
              rows={3}
              className="w-full text-xs text-[#202124] bg-[#F8F9FA] hover:bg-gray-100 placeholder-gray-400 p-3 rounded-xl border border-[#DADCE0] focus:bg-white focus:outline-none focus:border-[#1A73E8] transition-all font-mono leading-relaxed"
            />
          </div>

          {/* Model selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Veo Model Version</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 text-xs text-[#202124] bg-white hover:bg-gray-50 border border-[#DADCE0] rounded-lg focus:outline-none focus:border-[#1A73E8] cursor-pointer"
              >
                <option value="veo-3.1-lite-generate-preview">Veo 3.1 Lite (Speed)</option>
                <option value="veo-3.1-generate-preview">Veo 3.1 Pro (Quality)</option>
                <option value="gemini-3.5-flash">Gemini Flash 3.5</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full p-2 text-xs text-[#202124] bg-white hover:bg-gray-50 border border-[#DADCE0] rounded-lg focus:outline-none focus:border-[#1A73E8] cursor-pointer"
              >
                <option value="16:9">Horizontal (16:9)</option>
                <option value="9:16">Portrait Reels (9:16)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Format Resolution</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full p-2 text-xs text-[#202124] bg-white hover:bg-gray-50 border border-[#DADCE0] rounded-lg focus:outline-none focus:border-[#1A73E8] cursor-pointer"
              >
                <option value="720p">720p HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="4k" disabled={model !== 'veo-3.1-generate-preview'}>4K UHD (Veo Pro)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Camera Tracking</label>
              <select
                value={cameraMotion}
                onChange={(e) => setCameraMotion(e.target.value)}
                className="w-full p-2 text-xs text-[#202124] bg-white hover:bg-gray-50 border border-[#DADCE0] rounded-lg focus:outline-none focus:border-[#1A73E8] cursor-pointer"
              >
                <option value="zoom_in">Camera Zoom In</option>
                <option value="zoom_out">Camera Zoom Out</option>
                <option value="pan_left">Horizontal Pan Left</option>
                <option value="pan_right">Horizontal Pan Right</option>
                <option value="static">Static Lens Position</option>
              </select>
            </div>
          </div>

          {/* Image attachments slots */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Multimodal Reference Frames</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStartAttached(!startAttached)}
                className={`flex items-center justify-center flex-col gap-1.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  startAttached 
                    ? 'border-[#CEEAD6] bg-[#E6F4EA] text-[#137333] font-medium' 
                    : 'border-[#DADCE0] hover:border-[#bdc1c6] bg-white text-[#5F6368] hover:text-[#202124]'
                }`}
              >
                <ImageIcon size={14} className={startAttached ? 'text-[#137333]' : 'text-[#5F6368]'} />
                <span className="font-semibold text-[10px]">{startAttached ? '✓ Start Frame Saved' : '+ Starting Image'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => setEndAttached(!endAttached)}
                disabled={model !== 'veo-3.1-generate-preview'}
                className={`flex items-center justify-center flex-col gap-1.5 p-3 rounded-xl border text-xs transition-all ${
                  endAttached 
                    ? 'border-[#CEEAD6] bg-[#E6F4EA] text-[#137333] font-medium cursor-pointer' 
                    : model === 'veo-3.1-generate-preview' 
                      ? 'border-[#DADCE0] hover:border-[#bdc1c6] bg-white text-[#5F6368] hover:text-[#202124] cursor-pointer' 
                      : 'border-gray-200 bg-gray-100 text-[#bdc1c6] cursor-not-allowed'
                }`}
              >
                <ImageIcon size={14} className={endAttached ? 'text-[#137333]' : 'text-[#bdc1c6]'} />
                <span className="font-semibold text-[10px]">{endAttached ? '✓ End Frame Saved' : '+ Ending Frame'}</span>
              </button>
            </div>
            {model !== 'veo-3.1-generate-preview' && (
              <span className="text-[9px] text-[#5F6368] block mt-0.5">* Dual-frame bounding transitions require Veo Pro.</span>
            )}
          </div>

          {/* Big Generation Dispatch Trigger */}
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="w-full flex items-center justify-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#103F7A] text-white font-semibold text-xs py-3 rounded-xl shadow-sm cursor-pointer transition duration-150 disabled:bg-[#F1F3F4] disabled:text-[#3C4043] disabled:opacity-50"
          >
            {isCompiling ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                <span>Assembling Gemini Storyboard...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-yellow-300 animate-bounce" />
                <span>Compile Storyboard Visuals</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT DISPLAY: Sandbox Output Storyboard / Scene Transitions */}
        <div className="lg:col-span-7 bg-white border border-[#DADCE0] rounded-2xl p-6 flex flex-col min-h-[500px] justify-between shadow-sm">
          
          {/* Compilation Loader Screen */}
          {isCompiling ? (
            <div className="flex-1 flex flex-col justify-center items-center py-10 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-dashed border-[#1A73E8] rounded-full animate-spin" />
                <Layers className="absolute top-4 left-4 text-[#1A73E8] animate-pulse" size={32} />
              </div>
              <div className="text-center space-y-2 max-w-md">
                <h4 className="font-semibold text-[#202124] text-sm font-sans">Synthesizing Multimodal Frames</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed font-mono min-h-[40px]">
                  {compilationSteps[compileStep]}
                </p>
                <div className="w-48 h-1 bg-[#F1F3F4] rounded-full mx-auto overflow-hidden">
                  <div 
                    className="h-full bg-[#1A73E8] transition-all duration-300" 
                    style={{ width: `${((compileStep + 1) / compilationSteps.length) * 100}%` }} 
                  />
                </div>
              </div>
            </div>
          ) : activeStory ? (
            
            // Render Selected Storyboard & Interactive Simulator Video Box
            <div className="space-y-5 flex-1 flex flex-col justify-between">
              
              {/* VIDEO PLAYER COMPANION WIDGET */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-[#202124] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Interactive 12s Storyboard Player
                  </span>
                  <span className="font-mono text-[10px] text-[#5F6368]">Timeline Progress: {currentTime.toFixed(1)}s / 12.0s</span>
                </div>

                {/* Simulated Monitor Screen */}
                <div className="relative aspect-video rounded-xl bg-[#202124] border border-[#DADCE0] overflow-hidden flex items-center justify-center p-0.5 group">
                  {activeScene ? (
                    <>
                      {/* Interactive frame layer with smooth scale animations replicating dynamic camera movements */}
                      <img 
                        src={activeScene.imageUrl} 
                        alt={activeScene.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover rounded-lg scale-105 pointer-events-none filter brightness-95 transition-all duration-700 ease-in-out ${
                          isPlaying && activeScene.cameraMotion === 'zoom_in' ? 'scale-120' : ''
                        } ${
                          isPlaying && activeScene.cameraMotion === 'zoom_out' ? 'scale-95' : ''
                        } ${
                          isPlaying && activeScene.cameraMotion === 'pan_left' ? '-translate-x-3' : ''
                        } ${
                          isPlaying && activeScene.cameraMotion === 'pan_right' ? 'translate-x-3' : ''
                        }`}
                      />

                      {/* Video Vignette Shadow Grid Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Display lens movement and current scene details on top */}
                      <div className="absolute top-3 left-3 bg-[#202124]/90 border border-white/10 font-mono text-[9px] px-2 py-1 rounded text-[#F8F9FA] backdrop-blur-sm shadow flex items-center gap-1.5">
                        <Camera size={10} className="text-[#8AB4F8]" />
                        <span>Lens Actuator: {cameraMotion.toUpperCase()}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 bg-[#202124]/95 border border-white/15 p-3 rounded-xl backdrop-blur-sm shadow-xl flex items-start gap-2">
                        <span className="p-1 px-1.5 bg-[#1A73E8]/20 text-[#8AB4F8] border border-white/10 rounded text-[8px] font-bold tracking-wider uppercase font-mono mt-0.5 whitespace-nowrap">
                          Scene {activeSceneIndex + 1}
                        </span>
                        <div className="space-y-0.5">
                          <h5 className="font-bold text-white text-xs">{activeScene.title}</h5>
                          <p className="text-[10px] text-gray-300 leading-relaxed font-mono">{activeScene.narration}</p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Timeline and control row */}
                <div className="mt-3.5 flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 px-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] font-semibold cursor-pointer text-white transition-colors"
                      title={isPlaying ? "Pause Scene" : "Play Scene"}
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                      }}
                      className="p-1.5 rounded-lg bg-white border border-[#DADCE0] text-[#5F6368] hover:text-[#202124] cursor-pointer transition-colors"
                      title="Rewind Narrative timeline"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>

                  <div className="flex-1 h-1.5 bg-[#DADCE0] rounded-full overflow-hidden relative">
                    {/* Scene intervals */}
                    <div className="absolute left-[33.3%] top-0 bottom-0 w-0.5 bg-white/40" />
                    <div className="absolute left-[66.6%] top-0 bottom-0 w-0.5 bg-white/40" />
                    <div 
                      className="h-full bg-gradient-to-r from-[#1A73E8] to-indigo-500 transition-all duration-100" 
                      style={{ width: `${(currentTime / 12) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Storyboard Grid overview */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#5F6368] uppercase tracking-wider font-semibold block">Chronological Storyboard Grid</span>
                <div className="grid grid-cols-3 gap-3">
                  {activeStory.map((scene, index) => {
                    const isSceneActive = activeSceneIndex === index;
                    return (
                      <div 
                        key={scene.id}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentTime(index * 4);
                        }}
                        className={`p-2.5 bg-white border rounded-xl flex flex-col justify-between cursor-pointer transition-all ${
                          isSceneActive 
                            ? 'border-[#1A73E8] ring-1 ring-[#1A73E8] bg-[#E8F0FE]/30' 
                            : 'border-[#DADCE0] hover:border-[#bdc1c6] text-[#5F6368]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[10px] text-[#202124]">Scene {scene.id}</span>
                            <span className="font-mono text-[8px] text-[#5F6368]">{scene.duration}</span>
                          </div>
                          <p className="text-[10px] text-[#5F6368] line-clamp-2 leading-relaxed">{scene.prompt}</p>
                        </div>
                        <div className="mt-2 text-[8px] font-semibold text-[#1967D2] capitalize bg-[#E8F0FE] p-1 rounded border border-[#D2E3FC] text-center font-mono">
                          {scene.cameraMotion}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Developer Bridging: Synchronized Code Blocks */}
              <div className="pt-3 border-t border-[#DADCE0] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#5F6368] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 size={12} />
                    Auto-Synchronized Python Code
                  </span>
                  <span className="text-[9px] text-[#5F6368] font-mono">omni_video_gen v1.0.1</span>
                </div>
                <div className="p-3 bg-[#202124] rounded-xl font-mono text-[10px] text-[#F8F9FA] border border-transparent select-all overflow-x-auto leading-relaxed max-h-[80px]">
                  <pre>{generatedSdkCode}</pre>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center py-20 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#DADCE0] pr-6 pl-6 text-center space-y-4">
              <div className="p-4 bg-white border border-[#DADCE0] rounded-full shadow-sm">
                <Video size={28} className="text-[#bdc1c6] animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-semibold text-[#202124] text-xs uppercase tracking-wider font-sans">No active storyboard compilation</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Enter your video directives on the left frame panel and click <strong>"Compile Storyboard Visuals"</strong> to trigger Gemini Omni's high-speed video generation simulation!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
