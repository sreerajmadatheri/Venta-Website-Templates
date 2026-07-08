import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const cases = [
  {
    client: 'Vertex Labs',
    industry: 'Healthcare Tech',
    result: 'Deployed a custom LLM to automate provider relations, reducing ticket latency by 85%.',
    tech: ['GPT-4', 'RAG', 'Webhook'],
    color: '#00FF88',
  },
  {
    client: 'Meridian Capital',
    industry: 'Financial Services',
    result: 'Built an autonomous compliance agent that processes 40,000 documents/day with 99.3% accuracy.',
    tech: ['Claude 3', 'Vector DB', 'Audit Trail'],
    color: '#0EA5E9',
  },
  {
    client: 'Phantom Systems',
    industry: 'Cybersecurity',
    result: 'Architected an AI threat-detection pipeline that reduced mean detection time from 4h to 12 minutes.',
    tech: ['Mistral', 'Streaming', 'SIEM'],
    color: '#F59E0B',
  },
];

export default function CaseStudies() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16`}>
          <div>
            <p className="section-label">CASE STUDIES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
              Proven neural solutions
            </h2>
          </div>
          <button className="btn-outline flex items-center gap-2 self-start md:self-auto">
            More Projects <ArrowRight size={14} />
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div
              key={c.client}
              className={`card-glow p-7 flex flex-col justify-between min-h-[280px] group cursor-pointer reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-[11px] text-[#6B7280] tracking-wider">//2026</span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{ color: c.color, borderColor: `${c.color}30`, background: `${c.color}08` }}
                  >
                    {c.industry.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F0F0F2] mb-3">{c.client}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{c.result}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {c.tech.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-[#9CA3AF] bg-[#1A1A20] border border-[#1E1E24] px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
