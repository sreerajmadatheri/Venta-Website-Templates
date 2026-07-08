import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface MeterProps {
  label: string;
  value: string;
  percentage: number;
  sub: string;
  color: string;
  triggered: boolean;
}

function Meter({ label, value, percentage, sub, color, triggered }: MeterProps) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const timer = setTimeout(() => setWidth(percentage), 200);
    return () => clearTimeout(timer);
  }, [triggered, percentage]);

  return (
    <div className="card-glow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-[10px] text-[#6B7280] tracking-widest uppercase mb-1">{label}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded border" style={{ color, borderColor: `${color}30`, background: `${color}10` }}>
          LIVE
        </span>
      </div>
      <div className="h-1.5 bg-[#1E1E24] rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}60, ${color})`, transitionDuration: '1.5s' }}
        />
      </div>
      <p className="text-[#6B7280] text-xs font-mono">{sub}</p>
    </div>
  );
}

const meters = [
  { label: 'System Load', value: '98.7%', percentage: 98.7, sub: 'Peak throughput sustained', color: '#00FF88' },
  { label: 'SLA Response', value: '99.99%', percentage: 99.99, sub: 'Across all regions', color: '#0EA5E9' },
  { label: 'Token Usage', value: '8.4M', percentage: 72, sub: 'Monthly tokens processed', color: '#F59E0B' },
  { label: 'Growth Vector', value: '+82%', percentage: 82, sub: 'Net growth this quarter', color: '#00FF88' },
];

export default function Telemetry() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 border-y border-[#1E1E24]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label">PRODUCT STATISTICS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
              Optimized for<br />
              <span className="text-gradient">performance</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#6B7280] text-sm max-w-xs">Live telemetry from active deployments. Updated every 30 seconds.</p>
            <button className="btn-accent self-start flex items-center gap-2">
              Request Demo <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {meters.map((m) => (
            <Meter key={m.label} {...m} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
