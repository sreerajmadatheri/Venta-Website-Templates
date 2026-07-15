import { Brain, Eye, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const pillars = [
  {
    icon: Brain,
    tag: '01 // LOGIC',
    title: 'Prime Logic',
    desc: 'Model alignment from day one. We fine-tune reasoning pathways and validate agent outputs against ground-truth benchmarks before any production deployment.',
    color: '#00FF88',
  },
  {
    icon: Eye,
    tag: '02 // CLARITY',
    title: 'Total Clarity',
    desc: 'Full observability across every inference call, tool use, and decision node. Trace any agent action back to its exact input, token, and model version.',
    color: '#0EA5E9',
  },
  {
    icon: Zap,
    tag: '03 // VELOCITY',
    title: 'Fast Cycles',
    desc: 'From prototype to production in weeks, not quarters. Our sprint-based delivery model means you see working agents — not just proposals — from sprint one.',
    color: '#F59E0B',
  },
];

export default function Approach() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">OUR APPROACH</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Built for the long term
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-base leading-relaxed">
            Three principles govern every engagement. They're not aspirational — they're operational requirements on every project we ship.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`card-glow p-8 group reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
              >
                <p className="font-mono text-[10px] tracking-widest mb-6" style={{ color: `${p.color}80` }}>{p.tag}</p>
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105"
                  style={{ borderColor: `${p.color}25`, background: `${p.color}10` }}
                >
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <h3 className="text-[#F0F0F2] text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{p.desc}</p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-10" style={{ color: p.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}