import { useState } from 'react';
import { Search, BarChart2, Brain, Rocket } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const tabs = [
  {
    id: 'DISCOVERY',
    icon: Search,
    headline: 'Map your entire data landscape',
    desc: 'We audit your existing systems, APIs, and data flows to identify automation opportunities and integration points before writing a single line of code.',
    details: ['System architecture audit', 'API inventory mapping', 'Workflow gap analysis', 'ROI scoring model'],
  },
  {
    id: 'ANALYSIS',
    icon: BarChart2,
    headline: 'Model selection & benchmark design',
    desc: 'We evaluate foundation models, design evaluation suites, and establish performance baselines specific to your domain — not generic leaderboard scores.',
    details: ['Custom eval harness', 'Domain benchmark design', 'Latency/cost profiling', 'Model comparison matrix'],
  },
  {
    id: 'TRAINING',
    icon: Brain,
    headline: 'Fine-tune for your exact use case',
    desc: 'Where general models fall short, we adapt them. Instruction tuning, RLHF alignment, and RAG architecture ensure your agents behave exactly as designed.',
    details: ['Instruction fine-tuning', 'RLHF alignment loop', 'RAG pipeline design', 'Knowledge base ingestion'],
  },
  {
    id: 'DEPLOY',
    icon: Rocket,
    headline: 'Production in days, not months',
    desc: 'CI/CD pipelines for AI. Canary deployments, automated rollback, real-time monitoring, and SLA enforcement baked in from the first push.',
    details: ['One-command deploy', 'Canary / blue-green', 'Automated rollback', 'SLA monitoring'],
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal();
  const tab = tabs[active];
  const Icon = tab.icon;

  return (
    <section className="relative py-28 px-6 border-y border-[#1E1E24]">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} text-center mb-12`}>
          <p className="section-label">PRODUCT FEATURES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
            Engineered for autonomy
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 justify-center mb-12 bg-[#111114] border border-[#1E1E24] rounded-xl p-1 max-w-xl mx-auto">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex-1 font-mono text-xs py-2 px-3 rounded-lg transition-all duration-200 tracking-wider ${
                active === i
                  ? 'bg-[#00FF88] text-[#0A0A0B] font-semibold'
                  : 'text-[#6B7280] hover:text-[#9CA3AF]'
              }`}
            >
              {t.id}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div key={active} style={{ animation: 'fadeIn 0.3s ease' }}>
            <div className="w-12 h-12 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mb-6">
              <Icon size={20} className="text-[#00FF88]" />
            </div>
            <h3 className="text-2xl font-bold text-[#F0F0F2] mb-4">{tab.headline}</h3>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">{tab.desc}</p>
            <div className="grid grid-cols-2 gap-3">
              {tab.details.map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#00FF88]" />
                  <span className="text-[#9CA3AF] text-sm">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="card-glow rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex items-center justify-center">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center mx-auto mb-4">
                <Icon size={36} className="text-[#00FF88]" />
              </div>
              <p className="font-mono text-xs text-[#6B7280] tracking-widest">{tab.id} PHASE</p>
              <p className="font-mono text-[10px] text-[#00FF88]/60 mt-1">● ACTIVE</p>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-[#00FF88]/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full border border-[#00FF88]/5 translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}
