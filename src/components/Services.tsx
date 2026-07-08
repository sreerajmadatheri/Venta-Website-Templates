import { Shield, Bot, Cloud, Database } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const services = [
  {
    icon: Shield,
    title: 'Secure Guard',
    desc: 'Enterprise-grade AI security, data privacy controls, and compliance frameworks built for regulated industries.',
    tag: '// SECURITY',
  },
  {
    icon: Bot,
    title: 'Agent Build',
    desc: 'Custom LLM-powered agents that reason, plan, and execute multi-step tasks across your business systems.',
    tag: '// AGENTS',
  },
  {
    icon: Cloud,
    title: 'Cloud Scale',
    desc: 'Infrastructure optimization for high-throughput AI workloads with auto-scaling and cost efficiency at every tier.',
    tag: '// INFRA',
  },
  {
    icon: Database,
    title: 'Data Mining',
    desc: 'End-to-end data pipelines, vector stores, and RAG architectures that turn raw data into retrievable intelligence.',
    tag: '// DATA',
  },
];

export default function Services() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">OUR SERVICES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Neural infrastructure,<br />built for production
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-base leading-relaxed">
            From model alignment to deployment pipelines — we build the systems that keep your AI reliable at scale.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className={`card-glow p-6 group reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
              >
                <div className="mb-5">
                  <span className="font-mono text-[10px] text-[#00FF88]/50 tracking-widest">{svc.tag}</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#00FF88]/8 border border-[#00FF88]/15 flex items-center justify-center mb-5 group-hover:border-[#00FF88]/30 transition-all duration-300">
                  <Icon size={18} className="text-[#00FF88]" />
                </div>
                <h3 className="text-[#F0F0F2] font-semibold text-lg mb-3">{svc.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
