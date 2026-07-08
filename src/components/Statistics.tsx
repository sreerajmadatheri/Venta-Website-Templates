import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { useCountUp } from '../hooks/useReveal';

function StatCard({ value, suffix, label, triggered }: {
  value: number;
  suffix: string;
  label: string;
  triggered: boolean;
}) {
  const count = useCountUp(value, 2000, triggered);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-1">
        <span className="text-5xl md:text-6xl font-bold tracking-tight accent-gradient">
          {suffix === '%' ? count.toFixed(2) : count}
        </span>
        <span className="text-2xl font-bold text-[#00FF88] pb-1">{suffix}</span>
      </div>
      <p className="text-[#6B7280] text-sm font-mono leading-relaxed">{label}</p>
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 border-y border-[#1E1E24]">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left */}
          <div className="flex-1">
            <p className="section-label">STATISTICS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-6 leading-tight">
              Quantifiable impact<br />
              <span className="text-gradient">at every layer</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed max-w-md mb-8">
              Every metric is measured in production. No synthetic benchmarks — just real performance across live deployments.
            </p>
            <a href="#" className="flex items-center gap-2 text-[#00FF88] text-sm font-medium hover:gap-3 transition-all duration-200 group">
              <span>View Full Report</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-1 gap-10">
            <StatCard value={12} suffix="ms" label="Average latency for real-time inference" triggered={triggered} />
            <StatCard value={40} suffix="x" label="Increase in manual task processing speed" triggered={triggered} />
            <StatCard value={99.99} suffix="%" label="Uptime for critical agent infrastructure" triggered={triggered} />
          </div>

          {/* Video */}
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden border border-[#1E1E24] group cursor-pointer card-glow">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Performance overview"
                className="w-full h-52 object-cover brightness-50 group-hover:brightness-40 transition-all duration-300"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-[#00FF88] bg-[#00FF88]/10 flex items-center justify-center group-hover:bg-[#00FF88]/20 transition-all duration-300 group-hover:scale-110">
                  <Play size={20} className="text-[#00FF88] ml-1" />
                </div>
                <span className="font-mono text-xs text-[#9CA3AF] tracking-wider">2 MIN OVERVIEW</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280]">// PERFORMANCE_DEMO_2026</span>
                <span className="font-mono text-[10px] text-[#00FF88]/60">▶ PLAY</span>
              </div>
            </div>
            <p className="text-[#6B7280] text-xs mt-3 font-mono">
              Watch how Armory agents process 10,000+ tasks/hour without degradation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
