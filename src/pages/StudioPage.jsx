import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, Upload, ArrowLeft, Sparkles, FileAudio, Play, 
  Check, Download, Share2, Youtube, Film, Camera, 
  Monitor, Smartphone, ChevronRight, Loader2, 
  BarChart3, Heart, Disc3, Mic2, 
  Palette
} from 'lucide-react';

// ── Mock AI Analysis Steps ──
const analysisSteps = [
  { id: 'emotion',    label: 'Detecting Emotion',    icon: Heart,     duration: 800 },
  { id: 'genre',      label: 'Analyzing Genre',      icon: Music,     duration: 600 },
  { id: 'tempo',      label: 'Measuring Tempo (BPM)', icon: BarChart3, duration: 700 },
  { id: 'instruments', label: 'Identifying Instruments', icon: Mic2,   duration: 900 },
  { id: 'lyrics',     label: 'Extracting Lyrics',    icon: FileAudio, duration: 500 },
  { id: 'mood',       label: 'Mapping Visual Mood',  icon: Palette,   duration: 700 },
];

// ── Mock Video Styles ──
const videoStyles = [
  { id: 'cinematic', name: 'Cinematic Film', color: 'from-amber-600 to-amber-800', desc: 'Epic movie-quality visuals' },
  { id: 'anime',     name: 'Anime Style',    color: 'from-pink-500 to-purple-600', desc: 'Vibrant Japanese animation' },
  { id: 'retro',     name: 'Retro VHS',      color: 'from-cyan-500 to-blue-600',   desc: '80s analog nostalgia' },
  { id: 'abstract',  name: 'Abstract Art',   color: 'from-violet-500 to-fuchsia-600', desc: 'Psychedelic visualizer' },
  { id: 'lyric',     name: 'Lyric Video',    color: 'from-emerald-500 to-teal-600', desc: 'Dynamic lyric animations' },
];

// ── Mock Export Formats ──
const exportFormats = [
  { id: 'youtube',   label: 'YouTube',  icon: Youtube,    res: '1080p' },
  { id: 'tiktok',    label: 'TikTok',   icon: Smartphone,  res: '1080p' },
  { id: 'instagram', label: 'Instagram', icon: Camera,     res: '1080p' },
  { id: 'mp4',       label: 'MP4 File',  icon: Film,       res: '4K' },
  { id: 'gif',       label: 'GIF Loop',  icon: Monitor,    res: '720p' },
];

// ── Mock Frames (generated) ──
const mockFrames = [
  { id: 1, color: 'from-rose-500/30 to-amber-500/30', label: 'Opening' },
  { id: 2, color: 'from-blue-500/30 to-purple-500/30', label: 'Verse 1' },
  { id: 3, color: 'from-emerald-500/30 to-teal-500/30', label: 'Chorus' },
  { id: 4, color: 'from-orange-500/30 to-pink-500/30', label: 'Verse 2' },
  { id: 5, color: 'from-violet-500/30 to-indigo-500/30', label: 'Bridge' },
  { id: 6, color: 'from-amber-500/30 to-rose-500/30', label: 'Finale' },
];

// ── Fade-in hook ──
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const FadeIn = ({ children, className = '', delay = 0 }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Sub-component: Waveform Visualizer ──
const WaveformVisualizer = ({ active = false }) => (
  <div className="flex items-end justify-center gap-[3px] h-16 px-2">
    {Array.from({ length: 32 }).map((_, i) => (
      <div key={i}
        className={`flex-1 rounded-full transition-all duration-300 ${
          active ? 'bg-gold-400' : 'bg-white/10'
        }`}
        style={{
          height: active ? `${15 + Math.sin(i * 0.6 + Date.now() * 0.001) * 30 + Math.random() * 15}%` : '8%',
          animation: active ? `pulse 0.5s ease-in-out infinite` : 'none',
          animationDelay: `${i * 30}ms`,
        }}
      />
    ))}
  </div>
);

// ── Main Studio Component ──
export default function StudioPage() {
  const [step, setStep] = useState('upload'); // upload | analyzing | results | export
  const [fileSelected, setFileSelected] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [exportFormat, setExportFormat] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const dropRef = useRef(null);

  // ── File Upload Handlers ──
  const handleFileDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (f && f.type.startsWith('audio/')) {
      setFileSelected({ name: f.name, size: f.size });
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // ── Start Analysis ──
  const startAnalysis = () => {
    setStep('analyzing');
    setAnalysisProgress(0);
    setCurrentAnalysisStep(0);
  };

  useEffect(() => {
    if (step !== 'analyzing') return;
    const total = analysisSteps.length;
    const stepDurations = analysisSteps.map(s => s.duration);
    const totalDuration = stepDurations.reduce((a, b) => a + b, 0);
    
    let elapsed = 0;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      elapsed += 50;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setAnalysisProgress(pct);
      
      const newStepIdx = Math.min(
        total - 1,
        stepDurations.findIndex((_, i) => {
          const cumSum = stepDurations.slice(0, i + 1).reduce((a, b) => a + b, 0);
          return elapsed < cumSum;
        }) === -1 ? total - 1 : stepDurations.findIndex((_, i) => {
          const cumSum = stepDurations.slice(0, i + 1).reduce((a, b) => a + b, 0);
          return elapsed < cumSum;
        })
      );
      
      // Fix stepIndex calculation
      let cum = 0;
      let idx = 0;
      for (let i = 0; i < total; i++) {
        cum += stepDurations[i];
        if (elapsed < cum) { idx = i; break; }
        idx = total - 1;
      }
      
      setCurrentAnalysisStep(idx);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => setStep('results'), 400);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [step]);

  // ── Export Handler ──
  const handleExport = (format) => {
    setExportFormat(format);
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
    }, 2000);
  };

  // ── Format file size ──
  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-cinema-950 text-white font-body antialiased">
      {/* ── Studio Header ── */}
      <header className="sticky top-0 z-50 bg-cinema-950/90 backdrop-blur-xl border-b border-cinema-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = '#home'; }} className="flex items-center gap-2 text-white/60 hover:text-gold-400 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm hidden sm:inline">Back to Home</span>
              </a>
              <div className="w-px h-6 bg-cinema-700/50 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <Music className="w-3.5 h-3.5 text-cinema-950" />
                </div>
                <span className="text-sm font-semibold text-white/90">Music Video Studio</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-white/30 px-3 py-1 rounded-full bg-cinema-800/50 border border-cinema-700/50">
                Beta v0.1
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cinema-950" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Step Indicators ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
          {[
            { key: 'upload', label: 'Upload', icon: Upload },
            { key: 'analyzing', label: 'AI Analyze', icon: BarChart3 },
            { key: 'results', label: 'Results', icon: Play },
            { key: 'export', label: 'Export', icon: Download },
          ].map((s, i) => {
            const isActive = step === s.key || 
              (step === 'analyzing' && s.key === 'analyzing') ||
              (['results', 'export'].includes(step) && ['upload', 'analyzing'].includes(s.key)) ||
              (step === 'export' && s.key === 'export');
            const isDone = ['analyzing', 'results', 'export'].includes(step) && 
              ['upload'].includes(s.key) ||
              (['results', 'export'].includes(step) && ['upload', 'analyzing'].includes(s.key)) ||
              (step === 'export' && ['upload', 'analyzing', 'results'].includes(s.key));
            
            return (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isDone ? 'bg-gold-500 text-cinema-950' :
                    isActive ? 'bg-gold-500/20 border border-gold-500/50 text-gold-400' :
                    'bg-cinema-800/50 border border-cinema-700/50 text-white/30'
                  }`}>
                    {isDone ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block ${
                    isActive ? 'text-gold-400' : 'text-white/30'
                  }`}>{s.label}</span>
                </div>
                {i < 3 && (
                  <div className={`h-px w-8 sm:w-16 transition-all duration-500 ${
                    isDone ? 'bg-gold-500/50' : 'bg-cinema-700/50'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: Upload ── */}
        {step === 'upload' && (
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                  Drop Your Song
                </h1>
                <p className="text-white/40 text-base">
                  Upload any track and watch DreamForge AI transform it into a stunning music video.
                </p>
              </div>

              {/* Upload Zone */}
              <div
                ref={dropRef}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                className={`relative p-12 md:p-16 rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer
                  ${fileSelected 
                    ? 'border-gold-500/40 bg-gold-500/5 shadow-lg shadow-gold-500/10' 
                    : 'border-cinema-600/50 bg-cinema-900/50 hover:border-gold-500/30 hover:bg-cinema-900/80'
                  }`}
                onClick={() => !fileSelected && document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileDrop}
                />

                {!fileSelected ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-white/70 font-medium text-lg mb-1">
                        Drop an audio file here
                      </p>
                      <p className="text-white/30 text-sm">
                        or click to browse · MP3, WAV, FLAC, AAC
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {['🎵 Song', '🎤 Acapella', '🎹 Instrumental', '🎧 Podcast'].map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-cinema-800/80 text-white/40 text-xs border border-cinema-700/50">
                          {t}
                        </span>
                      ))}
                    </div>
                    <WaveformVisualizer active={false} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg mb-1">{fileSelected.name}</p>
                      <p className="text-white/30 text-sm">{formatSize(fileSelected.size)}</p>
                    </div>
                    <WaveformVisualizer active={true} />
                    <button
                      onClick={(e) => { e.stopPropagation(); setFileSelected(null); }}
                      className="text-xs text-white/30 hover:text-red-400 transition-colors"
                    >
                      Remove & choose another
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={startAnalysis}
                disabled={!fileSelected}
                className={`mt-8 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 flex items-center gap-3 mx-auto
                  ${fileSelected
                    ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 hover:from-gold-300 hover:to-gold-400 shadow-2xl shadow-gold-500/30'
                    : 'bg-cinema-800/50 text-white/20 cursor-not-allowed'
                  }`}
              >
                <Sparkles className="w-5 h-5" />
                Generate Music Video
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>
        )}

        {/* ── STEP 2: AI Analysis ── */}
        {step === 'analyzing' && (
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
                  <Loader2 className="w-4 h-4 text-gold-400 animate-spin" />
                  <span className="text-xs text-gold-400 font-medium">AI is analyzing your track</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Understanding Your Music
                </h2>
              </div>

              {/* Analysis Progress */}
              <div className="space-y-4 mb-10">
                {analysisSteps.map((s, i) => {
                  const isDone = i < currentAnalysisStep;
                  const isCurrent = i === currentAnalysisStep;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                        isCurrent
                          ? 'bg-gold-500/5 border-gold-500/30 shadow-lg shadow-gold-500/5'
                          : isDone
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-cinema-900/50 border-cinema-700/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isDone
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : isCurrent
                            ? 'bg-gold-500/20 border border-gold-500/30'
                            : 'bg-cinema-800/50 border border-cinema-700/50'
                      }`}>
                        {isDone ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <s.icon className={`w-5 h-5 ${isCurrent ? 'text-gold-400' : 'text-white/20'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${
                            isDone ? 'text-emerald-400' : isCurrent ? 'text-gold-400' : 'text-white/30'
                          }`}>
                            {s.label}
                          </span>
                          {isCurrent && (
                            <span className="text-xs text-gold-400/60">{Math.round(analysisProgress)}%</span>
                          )}
                          {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="h-1.5 rounded-full bg-cinema-800/80 overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            isDone ? 'bg-emerald-500 w-full' : isCurrent ? 'bg-gold-500' : 'w-0'
                          }`} style={{ width: isCurrent ? `${analysisProgress}%` : isDone ? '100%' : '0%' }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Waveform Animation */}
              <div className="rounded-2xl bg-cinema-900/50 border border-cinema-700/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-xs text-white/30 font-mono">LIVE · Analyzing waveform</span>
                </div>
                <div className="flex items-end gap-[2px] h-24">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="flex-1 rounded-full transition-all"
                      style={{
                        height: `${Math.sin(i * 0.3) * 30 + Math.cos(i * 0.1) * 20 + 40 + Math.random() * 15}%`,
                        background: `linear-gradient(to top, rgba(212, 168, 83, ${0.3 + Math.sin(i * 0.2) * 0.3}), rgba(212, 168, 83, ${0.1 + Math.cos(i * 0.15) * 0.2}))`,
                      }} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ── STEP 3: Results ── */}
        {step === 'results' && (
          <div>
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">Generation Complete</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Your Music Video is Ready
                </h2>
                <p className="text-white/40">
                  <span className="text-white/60 font-medium">{fileSelected?.name || 'Untitled Track'}</span> · 2:34 · 1080p
                </p>
              </div>

              {/* Video Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-cinema-700/50 mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cinema-800 to-cinema-950" />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/80 via-transparent to-transparent" />
                
                {/* Mock video "frames" as a collage */}
                <div className="absolute inset-0 grid grid-cols-3 gap-0.5 p-0.5">
                  {mockFrames.map((frame) => (
                    <div key={frame.id} className={`bg-gradient-to-br ${frame.color} rounded-sm flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-cinema-950/30" />
                      <span className="text-white/10 text-xs font-medium z-10">{frame.label}</span>
                    </div>
                  ))}
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center 
                    group-hover:bg-gold-500/30 transition-all duration-300 cursor-pointer">
                    <Play className="w-7 h-7 text-gold-400 ml-1" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-gold-400" />
                    <span className="text-sm text-white/60">{fileSelected?.name?.replace(/\.[^.]+$/, '') || 'My Track'}</span>
                  </div>
                  <span className="text-xs text-white/30 font-mono">0:00 / 2:34</span>
                </div>
              </div>

              {/* Style Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gold-400" />
                  Choose a Style
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {videoStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedStyle === style.id
                          ? 'border-gold-500/50 bg-gold-500/10 shadow-lg shadow-gold-500/10'
                          : 'border-cinema-700/50 bg-cinema-900/50 hover:border-cinema-600/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.color} mb-3 flex items-center justify-center`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-white mb-0.5">{style.name}</div>
                      <div className="text-[10px] text-white/30">{style.desc}</div>
                      {selectedStyle === style.id && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-gold-400">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setStep('analyzing')}
                  className="px-6 py-3 border border-cinema-700/50 text-white/60 text-sm font-medium rounded-full hover:bg-cinema-800/50 transition-colors flex items-center gap-2 justify-center">
                  <Loader2 className="w-4 h-4" />
                  Regenerate
                </button>
                <button onClick={() => setStep('export')}
                  className="px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-sm font-bold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/25 flex items-center gap-2 justify-center">
                  <Download className="w-4 h-4" />
                  Continue to Export
                </button>
              </div>
            </FadeIn>
          </div>
        )}

        {/* ── STEP 4: Export ── */}
        {step === 'export' && (
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Export Your Music Video
                </h2>
                <p className="text-white/40 text-base">
                  Choose your format and quality. Ready for every platform.
                </p>
              </div>

              {/* Quality selector */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {['720p', '1080p', '4K'].map(q => (
                  <button key={q}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                      q === '1080p'
                        ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400'
                        : 'bg-cinema-800/50 border border-cinema-700/50 text-white/40 hover:border-cinema-600/50'
                    }`}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Format Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
                {exportFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => handleExport(fmt.id)}
                    disabled={exporting}
                    className={`p-5 rounded-2xl border transition-all duration-300 text-center ${
                      exportFormat === fmt.id && exporting
                        ? 'border-gold-500/50 bg-gold-500/10'
                        : exportDone && exportFormat === fmt.id
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-cinema-700/50 bg-cinema-900/50 hover:border-cinema-600/50'
                    }`}
                  >
                    <fmt.icon className={`w-8 h-8 mx-auto mb-3 ${
                      exportFormat === fmt.id && exporting ? 'text-gold-400 animate-pulse' :
                      exportDone && exportFormat === fmt.id ? 'text-emerald-400' :
                      'text-white/40'
                    }`} />
                    <div className="text-sm font-medium text-white mb-0.5">{fmt.label}</div>
                    <div className="text-[10px] text-white/30">{fmt.res}</div>
                    {exportFormat === fmt.id && exporting && (
                      <Loader2 className="w-4 h-4 mx-auto mt-2 text-gold-400 animate-spin" />
                    )}
                    {exportDone && exportFormat === fmt.id && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-emerald-400">
                        <Check className="w-3 h-3" /> Exported
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Post-export actions */}
              {exportDone && (
                <FadeIn>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-3 border border-cinema-700/50 text-white/60 text-sm font-medium rounded-full hover:bg-cinema-800/50 transition-colors flex items-center gap-2 justify-center">
                      <Download className="w-4 h-4" />
                      Download File
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-sm font-bold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/25 flex items-center gap-2 justify-center">
                      <Share2 className="w-4 h-4" />
                      Share Everywhere
                    </button>
                    <button onClick={() => { setStep('upload'); setFileSelected(null); setExportDone(false); setExportFormat(null); }}
                      className="px-6 py-3 border border-cinema-700/50 text-white/60 text-sm font-medium rounded-full hover:bg-cinema-800/50 transition-colors flex items-center gap-2 justify-center">
                      <Music className="w-4 h-4" />
                      Create Another
                    </button>
                  </div>
                </FadeIn>
              )}

              {!exporting && !exportDone && (
                <p className="text-xs text-white/20 mt-4">
                  Click any format above to start exporting
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-cinema-800/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-white/20">
            <Music className="w-3 h-3" />
            DreamForge AI Music Video Studio · Prototype
          </div>
        </div>
      </footer>
    </div>
  );
}