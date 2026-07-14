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
  const { ref, visible } = useReveal();

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} mb-14`}>
          <p className="section-label">INTEGRATIONS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Connects to everything
          </h2>
          <p className="text-[#6B7280] text-base max-w-lg mx-auto leading-relaxed">
            Venta AI Labs bridges your data and tools — Slack, GitHub, Salesforce, Stripe and hundreds more. One platform, zero silos.
          </p>
        </div>

        {/* Orbit visualization */}
        <div className="relative flex items-center justify-center" style={{ height: '340px' }}>
          {/* Outer ring */}
          <div className="absolute w-72 h-72 rounded-full border border-[#1E1E24] border-dashed animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          {/* Middle ring */}
          <div className="absolute w-48 h-48 rounded-full border border-[#00FF88]/10 animate-spin" style={{ animationDuration: '20s' }} />
          {/* Inner ring */}
          <div className="absolute w-28 h-28 rounded-full border border-[#00FF88]/20 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />

          {/* Center */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#111114] border border-[#00FF88]/30 flex items-center justify-center">
            <span className="font-mono text-[10px] text-[#00FF88] font-bold tracking-wider">ARM</span>
          </div>

          {/* Orbiting icons */}
          {integrations.map((int, i) => {
            const angle = (i / integrations.length) * 2 * Math.PI;
            const radius = i % 2 === 0 ? 136 : 96;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
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
          <div className="card-glow px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-[#6B7280] text-xs font-medium">+200 more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
