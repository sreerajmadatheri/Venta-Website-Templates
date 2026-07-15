import { Infinity, Cpu, Lock, Server, Mail, MessageSquare, GitBranch, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const features = [
  { icon: Infinity, title: 'Infinite Visual Canvas', desc: 'Build workflows of any complexity on an unbounded canvas with drag-and-drop simplicity.' },
  { icon: Cpu, title: 'Autonomous Execution', desc: 'Agents self-monitor, retry on failure, and escalate to humans only when needed.' },
  { icon: Lock, title: 'End-to-End Encryption', desc: 'All data in transit and at rest is encrypted with AES-256. Zero-trust by default.' },
  { icon: Server, title: 'Production-Ready Stack', desc: 'Deploy to any cloud in minutes. Auto-scaling, health checks, and rollback built-in.' },
];

const nodes = [
  { id: 'email', label: 'Email Trigger', icon: Mail, x: 5, y: 38, color: '#0EA5E9' },
  { id: 'if', label: 'If / Else', icon: GitBranch, x: 28, y: 38, color: '#F59E0B' },
  { id: 'agent', label: 'AI Agent', icon: Cpu, x: 51, y: 38, color: '#00FF88' },
  { id: 'email2', label: 'Send Email', icon: Mail, x: 74, y: 18, color: '#0EA5E9' },
  { id: 'slack', label: 'Post Slack', icon: MessageSquare, x: 74, y: 58, color: '#E01E5A' },
];

function Node({ label, icon: Icon, x, y, color }: typeof nodes[0]) {
  return (
    <div
      className="absolute border border-[#1E1E24] bg-[#111114] rounded-lg p-3 flex items-center gap-2.5 shadow-xl hover:border-[#00FF88]/20 transition-colors cursor-grab active:cursor-grabbing"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translateY(-50%)' }}
    >
      <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ background: `${color}10` }}>
        <Icon size={12} style={{ color }} />
      </div>
      <span className="font-mono text-[10px] text-[#F0F0F2] font-semibold whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function ProductShowcase({ id }: { id?: string }) {
  const { ref: headingRef, visible: headingVisible } = useReveal<HTMLDivElement>();
  const { ref: canvasRef, visible: canvasVisible } = useReveal<HTMLDivElement>();
  const { ref: gridRef, visible: gridVisible } = useReveal<HTMLDivElement>(); // Correctly typed ref declarations

  return (
    <section id={id} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} text-center mb-16`}>
          <p className="section-label">VISUAL CANVAS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-4">
            Build with drag-and-drop clarity
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-base leading-relaxed">
            Configure triggers, models, logic trees, and integrations visually. Export to executable server-less configs with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          {/* Visual Canvas Panel */}
          <div ref={canvasRef} className={`lg:col-span-3 reveal ${canvasVisible ? 'visible' : ''}`}>
            <div className="card-glow h-[320px] relative overflow-hidden flex flex-col justify-between">
              {/* Grid Background */}
              <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

              {/* Canvas header */}
              <div className="px-5 py-3 border-b border-[#1E1E24] bg-[#0D0D10]/80 backdrop-blur-sm flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-mono text-[10px] text-[#6B7280] ml-2">Workflow Designer // Main_Pipeline.vta</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#00FF88] bg-[#00FF88]/10 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
              </div>

              {/* Node container space */}
              <div className="flex-1 relative">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="20%" y1="50%" x2="35%" y2="50%" stroke="#1E1E24" strokeWidth="1.5" strokeDasharray="4" />
                  <line x1="45%" y1="50%" x2="58%" y2="50%" stroke="#00FF88" strokeWidth="1.5" />
                  <line x1="68%" y1="50%" x2="80%" y2="30%" stroke="#0EA5E9" strokeWidth="1.5" />
                  <line x1="68%" y1="50%" x2="80%" y2="70%" stroke="#E01E5A" strokeWidth="1.5" />
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

          {/* Features - Attached to gridRef */}
          <div ref={gridRef} className={`lg:col-span-2 grid grid-cols-1 gap-4 reveal ${gridVisible ? 'visible' : ''}`}>
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