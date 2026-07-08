import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const categories = ['Overview', 'Security', 'Protocols', 'Licensing'];

const faqs = [
  { cat: 'Overview', q: 'What is the Armory platform?', a: 'Armory is an AI automation platform that lets enterprises design, deploy, and monitor custom AI agents and workflows. It combines a visual no-code builder with a production-grade runtime for teams that need speed without sacrificing reliability.' },
  { cat: 'Overview', q: 'Does it provide pre-built agents?', a: 'Yes. Armory ships with a library of 50+ pre-built agent templates covering common enterprise tasks: email triage, document classification, support ticket routing, compliance review, and more. All templates are fully customizable.' },
  { cat: 'Overview', q: 'How does it differ from a chatbot?', a: 'A chatbot responds to queries. An Armory agent acts autonomously — it monitors triggers, makes multi-step decisions, calls external APIs, writes to databases, and executes tasks without waiting for human input between steps.' },
  { cat: 'Security', q: 'How is my data protected?', a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Armory operates on a zero-trust architecture with per-tenant data isolation. We are SOC 2 Type II certified and GDPR compliant. Your data is never used to train shared models.' },
  { cat: 'Protocols', q: 'What models does Armory support?', a: 'Armory supports all major frontier models including GPT-4o, Claude 3.5 Sonnet, Gemini Pro, Mistral Large, and open-source models via Groq or self-hosted Ollama. You can mix models within a single workflow.' },
  { cat: 'Licensing', q: 'What are the pricing tiers?', a: 'Armory offers three tiers: Starter (solo founders, $299/mo), Growth (teams up to 25, $1,499/mo), and Enterprise (custom). All plans include unlimited workflows and nodes. Enterprise adds dedicated infrastructure, SLA guarantees, and white-glove onboarding.' },
];

export default function FAQ() {
  const [activeCat, setActiveCat] = useState('Overview');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { ref, visible } = useReveal();

  const filtered = faqs.filter((f) => f.cat === activeCat);

  return (
    <section className="relative py-28 px-6 border-t border-[#1E1E24]">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} text-center mb-12`}>
          <p className="section-label">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-6">
            Common inquiries
          </h2>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setOpenIdx(null); }}
                className={`font-mono text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCat === cat
                    ? 'bg-[#00FF88] text-[#0A0A0B] border-[#00FF88] font-semibold'
                    : 'border-[#1E1E24] text-[#6B7280] hover:border-[#00FF88]/30 hover:text-[#9CA3AF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {filtered.map((item, i) => (
            <div key={item.q} className="card-glow overflow-hidden">
              <button
                className="w-full flex items-start justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className={`font-medium text-sm leading-snug transition-colors ${openIdx === i ? 'text-[#00FF88]' : 'text-[#F0F0F2]'}`}>
                  {item.q}
                </span>
                {openIdx === i
                  ? <ChevronUp size={16} className="text-[#00FF88] shrink-0 mt-0.5" />
                  : <ChevronDown size={16} className="text-[#6B7280] shrink-0 mt-0.5" />
                }
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5">
                  <p className="text-[#6B7280] text-sm leading-relaxed border-t border-[#1E1E24] pt-4">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[#6B7280] text-sm mt-10">
          Still have questions?{' '}
          <a href="#contact" className="text-[#00FF88] hover:underline">Contact Us</a>
        </p>
      </div>
    </section>
  );
}
