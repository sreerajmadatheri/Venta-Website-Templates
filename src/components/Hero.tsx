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

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-8">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1E1E24] bg-[#111114]/80 backdrop-blur-sm animate-fade-up">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider text-[#9CA3AF] uppercase">
            Venta AI Labs v2.0 Platform Live
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#F0F0F2] tracking-tight leading-[1.1] animate-fade-up [animation-delay:200ms]">
          We Build Custom<br />
          <span key={activeKeyword} className="accent-gradient h-20 inline-block transition-all duration-500">
            {keywords[activeKeyword]}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B7280] text-base md:text-lg max-w-xl leading-relaxed animate-fade-up [animation-delay:400ms]">
          Deploy production-ready LLM pipelines, autonomous agents, and intelligence-led workflows customized to your private business logic.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up [animation-delay:600ms]">
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-accent flex items-center gap-2 px-7 py-3 text-base cursor-pointer"
          >
            Build A Workflow
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="btn-outline flex items-center gap-2 px-7 py-3 text-base cursor-pointer"
          >
            <Zap size={15} className="text-[#00FF88]" />
            View Capabilities
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280] mt-4 animate-fade-up [animation-delay:800ms]">
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
              <span className="font-mono text-[11px] text-[#6B7280] tracking-wider font-semibold">
                {item.toUpperCase()}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1E1E24]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}