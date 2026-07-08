import { ArrowRight, Clock } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const articles = [
  {
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    title: 'Why Most AI Automation Fails in Production (And How to Fix It)',
    excerpt: 'Prototypes impress. Production destroys. We analyzed 50 failed AI deployments to find the common thread — and it\'s not the model.',
    tag: 'ENGINEERING',
    img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    date: 'Jun 15, 2026',
    readTime: '4 min read',
    title: 'RAG vs Fine-tuning: A Decision Framework for Enterprise Teams',
    excerpt: 'Both approaches adapt LLMs to your domain. The right choice depends on your data volatility, latency requirements, and budget.',
    tag: 'STRATEGY',
    img: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    date: 'May 30, 2026',
    readTime: '8 min read',
    title: 'Building an Agentic Compliance Layer: A Step-by-Step Architecture',
    excerpt: 'How Meridian Capital processes 40,000 compliance documents per day with a three-agent pipeline and zero human review for tier-1 cases.',
    tag: 'CASE STUDY',
    img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Articles() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section id="articles" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16`}>
          <div>
            <p className="section-label">INSIGHTS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
              Insights on neural logic
            </h2>
          </div>
          <button className="btn-outline flex items-center gap-2 self-start md:self-auto">
            View Articles <ArrowRight size={14} />
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <article
              key={a.title}
              className={`card-glow overflow-hidden group cursor-pointer reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="overflow-hidden h-44">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover brightness-60 group-hover:brightness-50 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] text-[#00FF88]/70 tracking-widest border border-[#00FF88]/20 bg-[#00FF88]/5 px-2 py-0.5 rounded">
                    {a.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#6B7280]">
                    <Clock size={10} />
                    <span className="font-mono text-[10px]">{a.readTime}</span>
                  </div>
                </div>
                <h3 className="text-[#F0F0F2] font-semibold text-base mb-3 leading-snug group-hover:text-[#00FF88] transition-colors duration-200">
                  {a.title}
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#6B7280]">{a.date}</span>
                  <ArrowRight size={14} className="text-[#6B7280] group-hover:text-[#00FF88] group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
