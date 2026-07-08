import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6 border-t border-[#1E1E24]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-30" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <p className="section-label">NEWSLETTER</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Get smarter about<br />AI systems
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-md mx-auto">
            Weekly insights on automation, AI workflows, and real builds. No fluff, just what works.
          </p>

          {submitted ? (
            <div className="card-glow py-6 px-8 rounded-xl flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-[#00FF88] font-mono text-sm">You're in. First issue drops next week.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-[#111114] border border-[#1E1E24] rounded-lg px-4 py-3 text-[#F0F0F2] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors font-mono"
              />
              <button type="submit" className="btn-accent flex items-center gap-2 justify-center whitespace-nowrap px-6 py-3">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p className="text-[#6B7280] text-xs mt-5 font-mono">
            // 2,400+ engineers and founders. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
