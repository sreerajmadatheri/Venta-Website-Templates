import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const categories = ['Overview', 'Security', 'Protocols', 'Licensing'];

const faqs = [
  { cat: 'Overview', q: 'What is the Venta AI Labs platform?', a: 'Venta AI Labs is an AI automation platform that lets enterprises design, deploy, and monitor custom AI agents and workflows. It combines a visual no-code builder with a production-grade runtime for teams that need speed without sacrificing reliability.' },
  { cat: 'Overview', q: 'Does it provide pre-built agents?', a: 'Yes. Venta AI Labs ships with a library of 50+ pre-built agent templates covering common enterprise tasks: email triage, document classification, support ticket routing, compliance review, and more. All templates are fully customizable.' },
  { cat: 'Overview', q: 'How does it differ from a chatbot?', a: 'A chatbot responds to queries. An Venta AI Labs agent acts autonomously — it monitors triggers, makes multi-step decisions, calls external APIs, writes to databases, and executes tasks without waiting for human input between steps.' },
  { cat: 'Security', q: 'How is my data protected?', a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Venta AI Labs operates on a zero-trust architecture with per-tenant data isolation. We are SOC 2 Type II certified and GDPR compliant. Your data is never used to train shared models.' },
  { cat: 'Protocols', q: 'How are model versions managed?', a: 'Our automated staging environment handles model shifts securely. When base models (like OpenAI or Anthropic updates) launch, they are shadow-run alongside your current version, benchmarked on compliance parameters, and routed only when safe.' }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const { ref, visible } = useReveal<HTMLDivElement>();
  const filtered = faqs.filter((f) => f.cat === activeTab);

  const handleContactScroll = () => {
    const target = document.getElementById('contact') || document.getElementById('newsletter');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <p className="section-label">QUESTIONS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-6">
            Frequently Asked
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setOpenQuestion(null); }}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/5'
                    : 'border-[#1E1E24] text-[#6B7280] hover:text-[#F0F0F2] hover:border-[#6B7280]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div key={item.q} className="card-glow overflow-hidden">
              <button
                className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
                onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
              >
                <span className={`font-medium text-sm leading-snug transition-colors ${openQuestion === item.q ? 'text-[#00FF88]' : 'text-[#F0F0F2]'}`}>
                  {item.q}
                </span>
                {openQuestion === item.q
                  ? <ChevronUp size={16} className="text-[#00FF88] shrink-0 mt-0.5" />
                  : <ChevronDown size={16} className="text-[#6B7280] shrink-0 mt-0.5" />
                }
              </button>
              {openQuestion === item.q && (
                <div className="px-5 pb-5">
                  <p className="text-[#6B7280] text-sm leading-relaxed border-t border-[#1E1E24] pt-4">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[#6B7280] text-xs font-mono mt-12">
          Have a unique infrastructure requirement?{' '}
          <span
            onClick={handleContactScroll}
            className="text-[#00FF88] underline cursor-pointer hover:text-[#00E577] transition-colors"
          >
            Get in touch
          </span>{' '}
          with engineering.
        </p>
      </div>
    </section>
  );
}