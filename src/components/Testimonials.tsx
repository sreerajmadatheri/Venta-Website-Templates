import { Star } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    company: 'Vertex Labs',
    title: 'Infrastructure that finally scales',
    rating: 5,
    comment: "We\'ve tried every automation platform on the market. Venta AI Labs is the first one that didn\'t collapse under production load. Their agents just work.",
    author: 'Dr. Sarah Chen',
    role: 'CTO',
  },
  {
    company: 'Meridian Capital',
    title: 'Reduced compliance overhead by 90%',
    rating: 5,
    comment: 'The custom compliance agent they built processes in a day what used to take our team a full week. The accuracy is better than our human review too.',
    author: 'James Whitfield',
    role: 'Head of Operations',
  },
  {
    company: 'Phantom Systems',
    title: 'Threat detection reimagined',
    rating: 5,
    comment: 'From discovery call to live agent in 18 days. Their fast cycles methodology is no marketing fluff — it\'s how they actually operate.',
    author: 'Marcus Li',
    role: 'VP Engineering',
  },
  {
    company: 'Axon Dynamics',
    title: 'Our team moved 3x faster overnight',
    rating: 5,
    comment: 'The workflow builder is genuinely intuitive. Non-technical stakeholders can now modify agent logic without touching code. That was unthinkable before.',
    author: 'Priya Nair',
    role: 'Product Director',
  },
];

export default function Testimonials() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section className="relative py-28 px-6 border-t border-[#1E1E24]">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
            Trusted by the pioneers
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.company}
              className={`card-glow p-6 flex flex-col gap-4 reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00FF88]/60 tracking-wider">{t.company.toUpperCase()}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={10} className="text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
              </div>
              <h4 className="text-[#F0F0F2] font-semibold text-sm leading-snug">{t.title}</h4>
              <p className="text-[#6B7280] text-xs leading-relaxed flex-1">"{t.comment}"</p>
              <div className="pt-3 border-t border-[#1E1E24]">
                <p className="text-[#9CA3AF] text-xs font-medium">{t.author}</p>
                <p className="text-[#6B7280] text-[10px] font-mono">{t.role} · {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
