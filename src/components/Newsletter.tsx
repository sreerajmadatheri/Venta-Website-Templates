import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Newsletter() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Automatically reset the success message after 4 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xjgnggjw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          message: `New access request submitted for contact@ventaailabs.com from user: ${email}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 border-t border-appBorder">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-30" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <p className="section-label">GET STARTED</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Accelerate your automation pipeline
          </h2>
          <p className="text-[#6B7280] text-base max-w-lg mx-auto leading-relaxed mb-10">
            Join the enterprise pilot program or request an architectural consultation for custom model execution.
          </p>

          {submitted ? (
            <div className="card-glow max-w-md mx-auto p-6 flex flex-col items-center gap-3 animate-fade-up">
              <CheckCircle size={32} className="text-[#00FF88]" />
              <h4 className="text-[#F0F0F2] font-semibold text-base">Request submitted successfully</h4>
              <p className="text-[#6B7280] text-xs leading-relaxed">
                A systems engineer will reach out to your team within 12 business hours.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-2 p-1.5 rounded-xl border border-appBorder bg-[#111114]/60 backdrop-blur-sm">
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email address"
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F0F0F2] placeholder-[#6B7280] focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent px-4 py-2 text-xs flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span>Sending...</span>
                      <Loader2 size={12} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Request Access</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>

              {error && (
                <p className="text-red-500 text-xs mt-3 text-left px-2 font-mono">{error}</p>
              )}
            </div>
          )}

          <p className="text-[10px] font-mono text-[#6B7280] mt-4">
            // Secure per-tenant data framework. SOC2 Compliant.
          </p>
        </div>
      </div>
    </section>
  );
}