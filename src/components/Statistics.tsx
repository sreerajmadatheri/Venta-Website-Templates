import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Terminal, Cpu, Play, Pause, RefreshCw } from 'lucide-react';
import { useCountUp } from '../hooks/useReveal';

function StatCard({ value, suffix, label, triggered }: {
  value: number;
  suffix: string;
  label: string;
  triggered: boolean;
}) {
  const count = useCountUp(value, 2000, triggered);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end gap-1">
        <span className="text-5xl md:text-6xl font-bold tracking-tight accent-gradient">
          {suffix === '%' ? count.toFixed(2) : count}
        </span>
        <span className="text-2xl font-bold text-[#00FF88] pb-1">{suffix}</span>
      </div>
      <p className="text-[#6B7280] text-xs font-mono leading-relaxed">{label}</p>
    </div>
  );
}

interface LiveTask {
  id: string;
  agent: string;
  status: 'COMPLETED' | 'PROCESSING' | 'QUEUED';
  latency: string;
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Simulation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [taskCount, setTaskCount] = useState(10240);
  const [tasks, setTasks] = useState<LiveTask[]>([
    { id: 'TX-4091', agent: 'Compliance_Agent_3', status: 'COMPLETED', latency: '12ms' },
    { id: 'TX-4092', agent: 'Data_Ingest_0', status: 'PROCESSING', latency: '44ms' },
    { id: 'TX-4093', agent: 'Logic_Router_Primary', status: 'PROCESSING', latency: '8ms' },
  ]);

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

  // Tight simulation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTaskCount(prev => prev + Math.floor(Math.random() * 3) + 1);

      setTasks(prev => {
        const next = [...prev];
        next.pop();

        const agentNames = [
          'Compliance_Agent_3',
          'Data_Ingest_0',
          'Logic_Router_Primary',
          'Security_Guard_9',
          'Inference_Engine_Beta'
        ];
        const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];
        const randomTxId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
        const randomLatency = `${Math.floor(8 + Math.random() * 25)}ms`;

        next[0] = { ...next[0], status: 'COMPLETED' };

        return [
          { id: randomTxId, agent: randomAgent, status: 'PROCESSING', latency: randomLatency },
          ...next
        ];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-28 px-6 border-y border-[#1E1E24]">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="flex flex-col lg:flex-row gap-16 items-start lg:items-stretch">

          {/* Left Column: Info Section */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <p className="section-label">STATISTICS</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight mb-6 leading-tight">
                Quantifiable impact<br />
                <span className="text-gradient">at every layer</span>
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-md mb-8">
                Every metric is measured in production. No synthetic benchmarks — just real performance across live deployments.
              </p>
            </div>
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="flex items-center gap-2 text-[#00FF88] text-sm font-medium hover:gap-3 transition-all duration-200 group"
            >
              <span>View Case Studies</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Center Column: Counters */}
          <div className="flex-1 grid grid-cols-1 gap-8 py-1 border-y lg:border-y-0 lg:border-x border-[#1E1E24]/40 lg:px-8">
            <StatCard value={12} suffix="ms" label="Average latency for real-time inference" triggered={triggered} />
            <StatCard value={40} suffix="x" label="Increase in manual task processing speed" triggered={triggered} />
            <StatCard value={99.99} suffix="%" label="Uptime for critical agent infrastructure" triggered={triggered} />
          </div>

          {/* Right Column: Interactive Simulator Dashboard */}
          <div className="flex-1 w-full flex flex-col justify-between py-1">
            <div className="w-full relative rounded-xl overflow-hidden border border-[#1E1E24] bg-[#0E0E11] p-4 card-glow flex flex-col justify-between h-full">

              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E1E24] mb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={13} className="text-[#00FF88]" />
                  <span className="font-mono text-[11px] text-[#9CA3AF] tracking-wider uppercase">Venta agent simulator</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded hover:bg-[#1E1E24] text-[#6B7280] hover:text-[#00FF88] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause size={11} /> : <Play size={11} />}
                  </button>
                  <button
                    onClick={() => setTaskCount(10000)}
                    className="p-1 rounded hover:bg-[#1E1E24] text-[#6B7280] hover:text-[#00FF88] transition-colors cursor-pointer"
                  >
                    <RefreshCw size={11} />
                  </button>
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#141419] border border-[#1E1E24]/60 rounded-lg p-2.5">
                  <p className="font-mono text-[8px] text-[#6B7280] tracking-wider mb-0.5">COMPLETED TASKS</p>
                  <p className="text-lg font-bold font-mono text-[#00FF88]">{taskCount.toLocaleString()}</p>
                </div>
                <div className="bg-[#141419] border border-[#1E1E24]/60 rounded-lg p-2.5">
                  <p className="font-mono text-[8px] text-[#6B7280] tracking-wider mb-0.5">RUN STATE</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF88]"></span>
                    </span>
                    <p className="text-[11px] font-bold font-mono text-[#F0F0F2]">10k/HR STABLE</p>
                  </div>
                </div>
              </div>

              {/* Console log */}
              <div className="space-y-1.5 bg-[#070709] rounded-lg p-2.5 border border-[#1E1E24] h-[94px] overflow-hidden font-mono text-[9.5px]">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between text-[#8E939E]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#6B7280]">[{task.id}]</span>
                      <span className="text-[#00FF88]/90 truncate max-w-[110px]">{task.agent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B7280]">{task.latency}</span>
                      <span className={`px-1 rounded-sm text-[7.5px] font-bold ${
                        task.status === 'COMPLETED' ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-[#0EA5E9]/10 text-[#0EA5E9] animate-pulse'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware Indicator */}
              <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-[#1E1E24]">
                <Cpu size={11} className="text-[#6B7280]" />
                <span className="font-mono text-[8.5px] text-[#6B7280] tracking-tight">ACTIVE METRIC PIPELINE // DEGRADATION: 0.00%</span>
              </div>
            </div>

            <p className="text-[#6B7280] text-xs mt-3.5 font-mono leading-normal">
              Watch how Venta AI Labs agents process 10,000+ tasks/hour without degradation.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}