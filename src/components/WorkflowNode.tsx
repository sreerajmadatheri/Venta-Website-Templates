import { Handle, Position } from '@xyflow/react';
import { ArrowRight, Zap } from 'lucide-react';

export default function WorkflowNode({ data }: any) {
  const isTrigger = data.type?.includes('trigger') || data.type?.includes('cron') || data.type?.includes('webhook');
  const cleanTypeName = data.type?.replace('n8n-nodes-base.', '').replace('Trigger', '') || 'Node';

  return (
    <div className="relative px-4 py-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B]/95 min-w-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md hover:border-[#00FF88]/40 transition-all duration-300 group select-none">

      {/* Explicit Connection Handle Targets for Edge Snapping */}
      {!isTrigger && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-[#1E1E24] !w-2.5 !h-2.5 !border-2 !border-[#0D0D10] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: '-6px' }}
        />
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[#00FF88] !w-2.5 !h-2.5 !border-2 !border-[#0D0D10] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#00FF88]"
        style={{ right: '-6px' }}
      />

      <div className="flex items-center gap-3">
        {/* Node Icon Box Layout */}
        <div className={`p-2 rounded-lg shrink-0 ${isTrigger ? 'bg-[#FF4A6B]/10 text-[#FF4A6B] border border-[#FF4A6B]/20' : 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20'}`}>
          {isTrigger ? <Zap size={14} className="animate-pulse" /> : <ArrowRight size={14} />}
        </div>

        {/* Text Labels Structure */}
        <div className="overflow-hidden flex-1">
          <p className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider truncate mb-0.5">
            {cleanTypeName}
          </p>
          <p className="text-xs font-bold text-[#F0F0F2] tracking-wide truncate group-hover:text-[#00FF88] transition-colors">
            {data.label}
          </p>
        </div>
      </div>

      {/* Decorative Outer Active Board Glow Indicator */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#1E1E24] to-transparent group-hover:via-[#00FF88]/50 transition-all duration-500 rounded-b-xl" />
    </div>
  );
}