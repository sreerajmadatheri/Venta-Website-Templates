import { Infinity, Cpu, Lock, Server, Mail, MessageSquare, GitBranch, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const features = [
  { icon: Infinity, title: 'Infinite Visual Canvas', desc: 'Build workflows of any complexity on an unbounded canvas with drag-and-drop simplicity.' },
  { icon: Cpu, title: 'Autonomous Execution', desc: 'Agents self-monitor, retry on failure, and escalate to humans only when needed.' },
  { icon: Lock, title: 'End-to-End Encryption', desc: 'All data in transit and at rest is encrypted with AES-256. Zero-trust by default.' },
  { icon: Server, title: 'Production-Ready Stack', desc: 'Deploy to any cloud in minutes. Auto-scaling, health checks, and rollback built-in.' },
];

const nodes = [
  { id: 'email', label: 'Email Trigger', icon: Mail, x: 12, y: 50, color: '#0EA5E9' },
  { id: 'if', label: 'If / Else', icon: GitBranch, x: 34, y: 50, color: '#F59E0B' },
  { id: 'agent', label: 'AI Agent', icon: Cpu, x: 56, y: 50, color: '#00FF88' },
  { id: 'email2', label: 'Send Email', icon: Mail, x: 78, y: 24, color: '#0EA5E9' },
  { id: 'tg', label: 'Telegram', icon: MessageSquare, x: 78, y: 76, color: '#0EA5E9' },
];

function Node({ label, icon: Icon, x, y, color }: { label: string; icon: any; x: number; y: number; color: string }) {
  return (
    <div
      className="absolute flex flex-col items-center group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Icon frame centered exactly on the coordinate */}
      <div
        className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ borderColor: `${color}30`, background: `${color}10` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      {/* Label offset underneath without distorting the coordinate alignment */}
      <span className="absolute top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#6B7280] tracking-wide whitespace-nowrap mt-1 select-none pointer-events-none">
        {label}
      </span>
    </div>
  );
}

export default function ProductShowcase() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: canvasRef, visible: canvasVisible } = useReveal();

  return (
    <section id="product-showcase" className="relative py-28 px-6">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">OUR PRODUCT</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Build logic at scale
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-base leading-relaxed">
            A visual canvas meets production-grade execution. Design, test, and deploy AI workflows without writing a single line of infrastructure code.
          </p>
        </div>

        <div ref={canvasRef} className={`reveal ${canvasVisible ? 'visible' : ''} grid grid-cols-1 lg:grid-cols-5 gap-6 items-start`}>
          {/* Canvas */}
          <div className="lg:col-span-3 relative">
            <div className="card-glow rounded-2xl overflow-hidden">
              {/* Canvas header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E1E24] bg-[#0D0D10]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-[10px] text-[#6B7280]">workflow_v3.Venta AI Labs</span>
                <div className="flex items-center gap-1.5">
                  <Zap size={12} className="text-[#00FF88]" />
                  <span className="font-mono text-[10px] text-[#00FF88]">LIVE</span>
                </div>
              </div>

              {/* Canvas body */}
              <div className="relative bg-[#0A0A0B] grid-bg" style={{ height: '280px' }}>
                {/* Connection lines SVG */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  {/* Static paths aligning perfectly with the Node coordinate parameters */}
                  {/* email (12%, 50%) -> if (34%, 50%) */}
                  <line x1="12%" y1="50%" x2="34%" y2="50%" stroke="#1E1E24" strokeWidth="1.5" strokeDasharray="4,3" />
                  {/* if (34%, 50%) -> agent (56%, 50%) */}
                  <line x1="34%" y1="50%" x2="56%" y2="50%" stroke="#1E1E24" strokeWidth="1.5" strokeDasharray="4,3" />
                  {/* agent (56%, 50%) -> email2 (78%, 24%) */}
                  <line x1="56%" y1="50%" x2="78%" y2="24%" stroke="#1E1E24" strokeWidth="1.5" strokeDasharray="4,3" />
                  {/* agent (56%, 50%) -> tg (78%, 76%) */}
                  <line x1="56%" y1="50%" x2="78%" y2="76%" stroke="#1E1E24" strokeWidth="1.5" strokeDasharray="4,3" />

                  {/* Active glowing overlay lines */}
                  <line x1="12%" y1="50%" x2="34%" y2="50%" stroke="#00FF88" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="34%" y1="50%" x2="56%" y2="50%" stroke="#00FF88" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="56%" y1="50%" x2="78%" y2="24%" stroke="#00FF88" strokeWidth="1" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="56%" y1="50%" x2="78%" y2="76%" stroke="#00FF88" strokeWidth="1" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
                  </line>
                </svg>

                {nodes.map((n) => (
                  <Node key={n.id} {...n} />
                ))}
              </div>

              {/* Canvas footer */}
              <div className="px-5 py-3 border-t border-[#1E1E24] bg-[#0D0D10] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280]">5 nodes · 4 connections · last run 2s ago</span>
                <span className="font-mono text-[10px] text-[#00FF88]">● Running</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card-glow p-5 flex gap-4 group">
                  <div className="w-9 h-9 rounded-lg bg-[#00FF88]/8 border border-[#00FF88]/15 flex items-center justify-center shrink-0 group-hover:border-[#00FF88]/30 transition-all duration-300 mt-0.5">
                    <Icon size={16} className="text-[#00FF88]" />
                  </div>
                  <div>
                    <h4 className="text-[#F0F0F2] font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-[#6B7280] text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}