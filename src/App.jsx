import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, Menu, X, Play, ArrowRight, Check, Star, Film, Music, BookOpen, Palette, Mic, Users, Mountain, Megaphone, Share2, Briefcase, Church, Layers } from 'lucide-react';

// ── Fade-in on scroll hook (lightweight Intersection Observer) ──
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

const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ── SVG Icon component (loads designer's SVGs from /assets/) ──
const FeatureIcon = ({ name, label }) => (
  <img src={`/assets/icon-${name}.svg`} alt={label} className="w-9 h-9 md:w-10 md:h-10" />
);

// ── Navigation ──
const Navbar = ({ scrolled }) => (
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled ? 'bg-cinema-900/90 backdrop-blur-xl shadow-lg shadow-cinema-900/50' : 'bg-transparent'
  }`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="DreamForge AI" className="h-7 md:h-8" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Workflow', 'Premium', 'Studio', 'Pricing'].map(item => {
            const href = item === 'Studio' ? '#studio' : `#${item.toLowerCase()}`;
            return (
              <a key={item} href={href}
                className={`text-sm font-medium transition-colors ${
                  item === 'Studio' 
                    ? 'text-gold-400 hover:text-gold-300' 
                    : 'text-white/70 hover:text-gold-400'
                }`}>
                {item === 'Studio' ? '🎬 Studio' : item}
              </a>
            );
          })}
          <button className="px-5 py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-sm font-semibold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-lg shadow-gold-500/25">
            Get Early Access
          </button>
        </div>
        <MobileMenu />
      </div>
    </div>
  </nav>
);

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80 hover:text-white">
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {open && (
        <div className="fixed inset-0 top-16 bg-cinema-950/98 backdrop-blur-xl z-40 md:hidden">
          <div className="flex flex-col items-center gap-6 pt-12">
            {['Features', 'Workflow', 'Premium', 'Studio', 'Pricing'].map(item => {
              const href = item === 'Studio' ? '#studio' : `#${item.toLowerCase()}`;
              return (
                <a key={item} href={href} onClick={() => setOpen(false)}
                  className={`text-lg transition-colors ${
                    item === 'Studio' ? 'text-gold-400 hover:text-gold-300' : 'text-white/80 hover:text-gold-400'
                  }`}>
                  {item === 'Studio' ? '🎬 Studio' : item}
                </a>
              );
            })}
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 font-semibold rounded-full">
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ── Hero Section ──
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Background */}
    <div className="absolute inset-0 bg-cinema-950" />
    <img src="/assets/hero-bg.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.08)_0%,_transparent_70%)]" />

    {/* Animated orbs */}
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cinema-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8">
        <Star className="w-4 h-4 text-gold-400" />
        <span className="text-xs md:text-sm text-gold-400 font-medium tracking-wider uppercase">Now in Beta</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
        <span className="text-white">The World's First</span>
        <br />
        <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
          AI Entertainment
        </span>
        <br />
        <span className="text-white">Studio</span>
      </h1>

      <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-10">
        Turn raw ideas, songs, manuscripts, or simple prompts into professional-grade 
        media — music videos, feature films, books, and more. No technical skills required.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={() => window.location.hash = '#studio'}
          className="group px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-base font-bold rounded-full hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-2xl shadow-gold-500/30 flex items-center gap-2">
          <Music className="w-5 h-5" />
          Start Creating
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 border border-white/20 text-white/80 text-base font-medium rounded-full hover:bg-white/5 transition-colors flex items-center gap-2">
          <Play className="w-5 h-5" />
          Watch Demo
        </button>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {['Hollywood-Grade Output', 'Zero Learning Curve', 'All-in-One Platform'].map(text => (
          <div key={text} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-white/40">{text}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-6 h-6 text-white/30" />
    </div>
  </section>
);

// ── Features Grid (13 cards with designer icons) ──
const features = [
  { icon: 'music-video',      title: 'AI Music Video Generator',     desc: 'Upload songs, AI creates cinematic music videos with synchronized visuals and effects.' },
  { icon: 'movie-studio',     title: 'AI Movie Studio',              desc: 'Turn manuscripts into complete films with AI-generated scenes, dialogue, and cinematography.' },
  { icon: 'series',           title: 'Automatic Series Creator',     desc: 'Books become TV series automatically — consistent characters, episodes, and narrative arcs.' },
  { icon: 'book-publisher',   title: 'AI Book Publisher',            desc: 'From idea to published book: writing, formatting, cover design, and distribution.' },
  { icon: 'book-cover',       title: 'AI Book Cover Designer',       desc: 'Premium publishing-quality covers that capture your book\'s essence.' },
  { icon: 'album-cover',      title: 'AI Album Cover Creator',       desc: 'Stunning album art optimized for every streaming platform.' },
  { icon: 'voice-studio',     title: 'AI Voice Studio',              desc: 'Narration, character voices, voice cloning, and multi-language dubbing.' },
  { icon: 'character',        title: 'AI Character Creator',         desc: 'Reusable consistent characters — maintain visual identity across your entire universe.' },
  { icon: 'scene-builder',    title: 'AI Scene Builder',             desc: 'Cinematic environments and backgrounds for any story or setting.' },
  { icon: 'marketing',        title: 'AI Marketing Studio',          desc: 'Posters, trailers, social media campaigns — all generated from your content.' },
  { icon: 'publishing',       title: 'AI Publishing Assistant',      desc: 'One-click publish to Spotify, YouTube, Amazon KDP, and more.' },
  { icon: 'business',         title: 'AI Business Suite',            desc: 'Business plans, pitch decks, websites, and branded content for entrepreneurs.' },
  { icon: 'ministry',         title: 'AI Ministry Creator',          desc: 'Sermons, Bible stories, faith films, and worship media for churches.' },
];

const Features = () => (
  <section id="features" className="relative py-24 md:py-32 bg-cinema-900">
    <div className="absolute inset-0 bg-gradient-to-b from-cinema-950 via-transparent to-cinema-950" />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeInSection>
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">13 Powerful Modules</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
            The Complete Creative Suite
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 text-lg">
            Everything you need to create professional content — all in one platform.
          </p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {features.map((feat, i) => (
          <FadeInSection key={i} delay={i * 50}>
            <div className="group relative p-6 md:p-7 rounded-2xl bg-cinema-800/50 border border-cinema-700/50 
              hover:border-gold-500/30 hover:bg-cinema-800/80 transition-all duration-500 
              hover:shadow-xl hover:shadow-gold-500/5 cursor-pointer h-full">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-500/10 
                border border-gold-500/20 flex items-center justify-center mb-4
                group-hover:from-gold-400/30 group-hover:to-gold-500/20 transition-all duration-500`}>
                <FeatureIcon name={feat.icon} label={feat.title} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2 group-hover:text-gold-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                bg-gradient-to-t from-gold-500/5 to-transparent pointer-events-none" />
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

// ── Workflow Section ──
const workflowSteps = [
  { icon: '📤', title: 'Upload / Input',      desc: 'Drop in your song, manuscript, prompt, or raw idea. DreamForge understands any creative input.' },
  { icon: '🧠', title: 'AI Analyzes',          desc: 'Our engine analyzes your content, extracting themes, structure, and creative direction.' },
  { icon: '⚡', title: 'Generate',             desc: 'Professional-grade video, audio, and visuals are generated in minutes.' },
  { icon: '✏️', title: 'Edit Naturally',       desc: 'Refine with natural language — "Make it shorter," "Change the mood to dark" — no timeline needed.' },
  { icon: '🚀', title: 'Export & Publish',     desc: 'Export in any format or publish directly to Spotify, YouTube, KDP, and more.' },
];

const Workflow = () => (
  <section id="workflow" className="relative py-24 md:py-32 bg-cinema-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeInSection>
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
            From Input to Published in Minutes
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 text-lg">
            A seamless pipeline that removes every technical barrier between you and your audience.
          </p>
        </div>
      </FadeInSection>

      <div className="relative">
        {/* Pipeline connector */}
        <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold-500/10 via-gold-500/40 to-gold-500/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
          {workflowSteps.map((s, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="relative p-6 rounded-2xl bg-cinema-900/80 border border-cinema-700/50 hover:border-gold-500/20 transition-all duration-500 text-center h-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 text-2xl">
                  {s.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-500 text-cinema-950 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* Demo preview */}
      <FadeInSection>
        <div className="mt-16 relative rounded-2xl overflow-hidden border border-cinema-700/50 bg-cinema-900/60">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
          <div className="relative p-6 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  See It in Action
                </h3>
                <p className="text-white/50 mb-6 leading-relaxed">
                  Watch how a simple song idea transforms into a full music video with album art, 
                  marketing assets, and a Spotify release — all under 5 minutes.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['🎵 Upload Track', '✨ AI Generates', '🎬 Final Export'].map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-cinema-800 text-white/60 text-xs border border-cinema-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-cinema-700 to-cinema-900 border border-cinema-700/50 
                  flex items-center justify-center group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/80 via-transparent to-transparent" />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center 
                      group-hover:bg-gold-500/30 transition-all duration-300">
                      <Play className="w-7 h-7 text-gold-400 ml-1" />
                    </div>
                    <span className="text-white/60 text-sm font-medium">Play Demo</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end gap-[3px] px-4 pb-3">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="flex-1 bg-gold-500/30 rounded-full"
                        style={{ height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

// ── Premium Features Showcase ──
const premiumStyles = [
  { name: 'Hollywood', emoji: '🎬', desc: 'Epic cinematic quality with dramatic lighting and score' },
  { name: 'Pixar',     emoji: '🏠', desc: 'Warm, stylized animation with heartwarming charm' },
  { name: 'Netflix',   emoji: '📺', desc: 'Binge-ready series format with modern production value' },
  { name: 'Disney',    emoji: '✨', desc: 'Magical storytelling with enchanting visuals' },
  { name: 'Marvel',    emoji: '⚡', desc: 'Action-packed superhero spectacle with VFX' },
  { name: 'Luxury',    emoji: '💎', desc: 'Premium high-end commercial aesthetic' },
];

const PremiumShowcase = () => (
  <section id="premium" className="relative py-24 md:py-32 bg-cinema-900">
    <div className="absolute inset-0 bg-gradient-to-b from-cinema-950 via-cinema-900 to-cinema-950" />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeInSection>
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">One-Click Magic</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
            Premium Style Transfer
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 text-lg">
            Apply iconic visual styles to any project with a single click. No manual editing required.
          </p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {premiumStyles.map((style, i) => (
          <FadeInSection key={i} delay={i * 80}>
            <div className="group relative p-8 rounded-2xl bg-cinema-800/40 border border-cinema-700/50 
              hover:border-gold-500/40 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-500/10 
                  border border-gold-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {style.emoji}
                </div>
                <div>
                  <div className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 inline-block mb-1">
                    <span className="text-[10px] text-gold-400 font-semibold tracking-widest uppercase">Style</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    Make it {style.name}
                  </h3>
                </div>
              </div>
              
              <p className="relative text-white/40 text-sm leading-relaxed mb-5">
                {style.desc}
              </p>

              <button className="relative w-full py-3 rounded-full border border-gold-500/30 text-gold-400 text-sm font-semibold
                group-hover:bg-gradient-to-r group-hover:from-gold-400 group-hover:to-gold-500 group-hover:text-cinema-950 
                transition-all duration-300">
                Apply Style
              </button>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

// ── Stats ──
const stats = [
  { number: '50K+', label: 'Creators Onboard' },
  { number: '100K+', label: 'Projects Created' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '4.9★', label: 'Average Rating' },
];

const Stats = () => (
  <section className="relative py-16 md:py-20 bg-cinema-900/50 border-y border-cinema-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-gold-400 mb-2">{s.number}</div>
            <div className="text-sm text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pricing ──
const plans = [
  {
    name: 'Creator',
    price: 'Free',
    features: ['3 projects/month', '720p exports', 'Watermark', 'Basic styles'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    features: ['25 projects/month', '1080p exports', 'No watermark', 'All styles', 'Voice cloning (5 hrs)'],
    popular: true,
  },
  {
    name: 'Studio',
    price: '$49',
    period: '/mo',
    features: ['Unlimited projects', '4K exports', 'Priority support', 'Multi-language dubbing', 'Direct publishing', 'API access'],
    popular: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="relative py-24 md:py-32 bg-cinema-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeInSection>
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
            Start Creating for Free
          </h2>
          <p className="max-w-xl mx-auto text-white/40 text-lg">
            Upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <FadeInSection key={i} delay={i * 100}>
            <div className={`relative p-8 rounded-2xl border transition-all duration-500 ${
              plan.popular
                ? 'bg-cinema-800/80 border-gold-500/40 shadow-2xl shadow-gold-500/10 scale-105'
                : 'bg-cinema-900/80 border-cinema-700/50 hover:border-cinema-600/50'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/40 text-sm">{plan.period}</span>}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-500/25'
                  : 'border border-white/20 text-white/80 hover:bg-white/5'
              }`}>
                {plan.name === 'Creator' ? 'Get Started Free' : 'Subscribe'}
              </button>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ──
const CTA = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cinema-900 via-cinema-950 to-cinema-900" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.06)_0%,_transparent_70%)]" />
    
    <div className="relative max-w-4xl mx-auto px-4 text-center">
      <FadeInSection>
        <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Create Your{' '}
          <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Masterpiece
          </span>
          ?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white/40 mb-10">
          Join thousands of creators already using DreamForge AI to produce professional content. 
          No credit card required.
        </p>
        <button className="group px-10 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-cinema-950 text-base font-bold rounded-full 
          hover:from-gold-300 hover:to-gold-400 transition-all duration-300 shadow-2xl shadow-gold-500/30 inline-flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          Start Creating Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </FadeInSection>
    </div>
  </section>
);

// ── Footer ──
const Footer = () => (
  <footer className="relative bg-cinema-950 border-t border-cinema-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {[
          { title: 'Product', links: ['Features', 'Workflow', 'Premium Styles', 'Pricing', 'Integrations'] },
          { title: 'Resources', links: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Community'] },
          { title: 'Company', links: ['About', 'Careers', 'Press Kit', 'Contact', 'Partners'] },
          { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'] },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cinema-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="DreamForge AI" className="h-6" />
          <span className="text-sm text-white/30 ml-2">DreamForge AI &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          {['Twitter', 'YouTube', 'Discord', 'GitHub'].map(s => (
            <a key={s} href="#" className="text-sm text-white/30 hover:text-gold-400 transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── Studio Page ──
import StudioPage from './pages/StudioPage.jsx';

// ── Simple Hash Router ──
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || '#home');
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

// ── App ──
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const hash = useHashRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Studio route
  if (hash === '#studio') {
    return <StudioPage />;
  }

  // Landing page (default)
  return (
    <div className="bg-cinema-950 text-white font-body antialiased selection:bg-gold-500/30 selection:text-white">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <Stats />
      <Workflow />
      <PremiumShowcase />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}