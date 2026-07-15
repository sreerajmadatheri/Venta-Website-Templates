import { useReveal } from '../hooks/useReveal';

const integrations = [
  { name: 'Slack', color: '#E01E5A' },
  { name: 'GitHub', color: '#F0F0F2' },
  { name: 'Notion', color: '#F0F0F2' },
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'Postgres', color: '#336791' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Twilio', color: '#F22F46' },
];

export default function Integrations() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-28 px-6"> {/* Removed conflicting ID */}
      <div className="max-w-7xl mx-auto text-center">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} mb-14`}>
          <p className="section-label">INTEGRATIONS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Connects to everything
          </h2>
          <p className="text-[#6B7280] text-base max-w-lg mx-auto leading-relaxed">
            Our runtime syncs with your operational database, messaging channels, and API stacks without complex middleware or proxying layers.
          </p>
        </div>

        {/* Dynamic visual integration graphic */}
        <div className="relative w-72 h-72 mx-auto mb-16 flex items-center justify-center">
          {/* Central logo container */}
          <div className="w-16 h-16 rounded-2xl bg-[#00FF88]/10 border-2 border-[#00FF88]/40 flex items-center justify-center z-20">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[#00FF88] rounded-sm rotate-45 scale-75" />
              <div className="absolute inset-0 border border-[#00FF88]/40 rounded-sm rotate-12" />
            </div>
          </div>

          {/* Orbits */}
          <div className="absolute w-52 h-52 rounded-full border border-[#1E1E24]/60 animate-spin-slow" />
          <div className="absolute w-72 h-72 rounded-full border border-[#1E1E24]/30" />

          {/* Integration nodes */}
          {integrations.slice(0, 4).map((int, i) => {
            const angle = (i * 90 * Math.PI) / 180;
            const x = Math.cos(angle) * 110;
            const y = Math.sin(angle) * 110;
            return (
              <div
                key={int.name}
                className="absolute z-10"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#111114] border border-[#1E1E24] flex items-center justify-center hover:border-[#00FF88]/30 transition-all duration-300 group cursor-pointer">
                  <span className="font-mono text-[8px] font-bold" style={{ color: int.color }}>
                    {int.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <p className="font-mono text-[8px] text-[#6B7280] text-center mt-1">{int.name}</p>
              </div>
            );
          })}
        </div>

        {/* Integration list */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {integrations.map((int) => (
            <div key={int.name} className="card-glow px-4 py-2 rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: int.color }} />
              <span className="text-[#9CA3AF] text-xs font-medium">{int.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}