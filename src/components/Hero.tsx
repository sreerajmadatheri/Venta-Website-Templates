import { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const keywords = ['AI Strategy', 'Custom Agents', 'Process Automation', 'Data Intelligence'];

const marqueeItems = [
  'GPT-4 Turbo', 'Claude 3.5', 'Perplexity AI', 'Llama 3', 'Gemini Pro',
  'Mistral AI', 'Cohere', 'Anthropic', 'OpenAI', 'Groq',
  'GPT-4 Turbo', 'Claude 3.5', 'Perplexity AI', 'Llama 3', 'Gemini Pro',
  'Mistral AI', 'Cohere', 'Anthropic', 'OpenAI', 'Groq',
];

export default function Hero() {
  const [activeKeyword, setActiveKeyword] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKeyword((prev) => (prev + 1) % keywords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0B] to-transparent pointer-events-none" />
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0EA5E9]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Rotating ticker */}
        <div className="flex items-center justify-center mb-8">
          <div className="border border-[#1E1E24] rounded-full px-5 py-2 bg-[#111114]/80 backdrop-blur-sm flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            <div className="h-5 overflow-hidden relative w-48 text-left">
              {keywords.map((kw, i) => (
                <span
                  key={kw}
                  className="absolute inset-0 font-mono text-xs text-[#9CA3AF] flex items-center transition-all duration-500"
                  style={{
                    opacity: i === activeKeyword ? 1 : 0,
                    transform: i === activeKeyword ? 'translateY(0)' : i < activeKeyword ? 'translateY(-100%)' : 'translateY(100%)',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <span className="text-[#1E1E24]">·</span>
            <div className="flex gap-2">
              {keywords.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i === activeKeyword ? 'bg-[#00FF88]' : 'bg-[#1E1E24]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="text-[#F0F0F2]">Power your </span>
          <br />
          <span className="accent-gradient">future</span>
          <span className="text-[#F0F0F2]"> with AI</span>
        </h1>

        {/* Subline */}
        <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Deploy custom enterprise agents and automate complex workflows.
          Scale your intelligence today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="btn-accent flex items-center gap-2 px-7 py-3 text-base">
            Build A Workflow
            <ArrowRight size={16} />
          </button>
          <button className="btn-outline flex items-center gap-2 px-7 py-3 text-base">
            <Zap size={15} className="text-[#00FF88]" />
            View Capabilities
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280]">
          {['500+ Workflows Deployed', '99.99% Uptime', 'Fortune 500 Clients', 'SOC 2 Certified'].map((stat) => (
            <div key={stat} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#00FF88]/60" />
              <span className="font-mono text-xs">{stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1E1E24] bg-[#0A0A0B]/80 backdrop-blur-sm overflow-hidden py-3">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-6 px-8 whitespace-nowrap">
              <span className="font-mono text-xs text-[#6B7280] tracking-widest uppercase">
                {item}
              </span>
              <span className="text-[#00FF88]/30 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
