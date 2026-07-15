import { ArrowRight, Clock } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface ArticleProps {
  id?: string;
}

const articles = [
  {
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    title: 'Why Most AI Automation Fails in Production (And How to Fix It)',
    excerpt: "Prototypes impress. Production destroys. We analyzed 50 failed AI deployments to find the common thread — and it's not the model.",
    tag: 'ENGINEERING',
    img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: 'https://a16z.com/emerging-architectures-for-llm-applications/',
  },
  {
    date: 'Jun 15, 2026',
    readTime: '4 min read',
    title: 'RAG vs Fine-tuning: A Decision Framework for Enterprise Teams',
    excerpt: 'Both approaches adapt LLMs to your domain. The right choice depends on your data volatility, latency requirements, and budget.',
    tag: 'STRATEGY',
    img: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: 'https://winder.ai/rag-vs-fine-tuning-2026-decision-framework/',
  },
  {
    date: 'May 30, 2026',
    readTime: '8 min read',
    title: 'Building an Agentic Compliance Layer: A Step-by-Step Architecture',
    excerpt: 'How Meridian Capital processes 40,000 documents a day autonomously, utilizing hierarchical multi-agent state architectures.',
    tag: 'ARCHITECTURE',
    img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    url: 'https://www.stackai.com/blog/the-2026-guide-to-agentic-workflow-architectures',
  },
];

export default function Articles({ id }: ArticleProps) {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section id={id} className="relative py-28 px-6 border-t border-[#1E1E24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">RESOURCES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Engineering Insights
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-base leading-relaxed">
            Technical breakdowns, decision trees, and system architectures compiled directly from real-world agent deployments.
          </p>
        </div>

        {/* Grid of Articles */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-glow overflow-hidden group flex flex-col justify-between h-full reveal reveal-delay-${i + 1} ${
                gridVisible ? 'visible' : ''
              }`}
            >
              <div>
                {/* Image header */}
                <div className="h-48 w-full overflow-hidden relative border-b border-[#1E1E24]">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover brightness-60 group-hover:brightness-50 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                {/* Content */}
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
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#1E1E24]/30 mt-auto">
                <span className="font-mono text-[10px] text-[#6B7280]">{a.date}</span>
                <span className="flex items-center gap-1 text-xs font-mono text-[#6B7280] group-hover:text-[#00FF88] transition-colors duration-200">
                  Read Article
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}