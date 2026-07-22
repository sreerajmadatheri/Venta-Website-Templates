import { Handle, Position } from '@xyflow/react';
import {
    Bot,
    Cpu,
    FileText,
    ShoppingBag,
    Users,
    DollarSign,
    Boxes,
    BarChart3,
    Zap,
    TrendingUp,
    Target,
    Briefcase,
    Layers,
    Database,
    Brain,
    Terminal,
    Activity,
} from 'lucide-react';

const getAgentIcon = (id: string, name: string) => {
    const label = (id + name).toLowerCase();

    if (label.includes('hub') || label.includes('orchestrator') || label.includes('engine')) return <Bot size={18} />;
    if (label.includes('doc') || label.includes('sec') || label.includes('rfp') || label.includes('record')) return <FileText size={16} />;
    if (label.includes('sale') || label.includes('lead')) return <ShoppingBag size={16} />;
    if (label.includes('hr') || label.includes('roster') || label.includes('team')) return <Users size={16} />;
    if (label.includes('finance') || label.includes('tax') || label.includes('risk') || label.includes('tx')) return <DollarSign size={16} />;
    if (label.includes('ops') || label.includes('inventory')) return <Boxes size={16} />;
    if (label.includes('report') || label.includes('analytic') || label.includes('market') || label.includes('benchmark')) return <BarChart3 size={16} />;
    if (label.includes('ad') || label.includes('campaign') || label.includes('media')) return <Target size={16} />;
    if (label.includes('strategy') || label.includes('proposal') || label.includes('consult')) return <Briefcase size={16} />;
    if (label.includes('portfolio') || label.includes('bid') || label.includes('roi')) return <TrendingUp size={16} />;
    if (label.includes('data') || label.includes('warehouse') || label.includes('etl') || label.includes('ehr')) return <Database size={16} />;
    if (label.includes('copywriter') || label.includes('rag') || label.includes('ai') || label.includes('diagnosis')) return <Brain size={16} />;
    if (label.includes('code') || label.includes('script')) return <Terminal size={16} />;
    if (label.includes('social') || label.includes('publisher')) return <Layers size={16} />;
    if (label.includes('telemetry') || label.includes('vitals') || label.includes('patient')) return <Activity size={16} />;

    return <Cpu size={16} />;
};

export default function WorkflowNode({ data }: any) {
    const isCenter = data.isCenter || data.type?.includes('agentHub');
    const isTrigger =
        data.type?.includes('trigger') ||
        data.type?.includes('cron') ||
        data.type?.includes('webhook');

    const cleanTypeName =
        data.subtitle ||
        data.type?.replace('n8n-nodes-base.', '').replace('Trigger', '') ||
        'Node';

    if (isCenter) {
        return (
            <div className="relative px-6 py-4 rounded-2xl border-2 border-[#8B9CFF] bg-[#101627] min-w-[260px] shadow-[0_0_35px_rgba(139,156,255,0.35)] cursor-grab active:cursor-grabbing select-none text-left">
                <Handle
                    type="target"
                    position={Position.Left}
                    id="left"
                    className="!bg-[#8B9CFF] !border-2 !border-[#101627] !w-2.5 !h-2.5 !-left-1.5"
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="right"
                    className="!bg-[#8B9CFF] !border-2 !border-[#101627] !w-2.5 !h-2.5 !-right-1.5"
                />

                <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#8B9CFF]/15 text-[#8B9CFF] border border-[#8B9CFF]/30 shadow-[0_0_12px_rgba(139,156,255,0.4)] shrink-0">
                        {getAgentIcon(data.id || '', data.label)}
                    </div>
                    <div className="overflow-hidden flex-1">
                        <p className="text-[10px] font-mono text-[#8B9CFF] uppercase tracking-widest truncate mb-0.5 font-bold">
                            {cleanTypeName}
                        </p>
                        <p className="text-sm font-black text-white tracking-wide truncate">
                            {data.label}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative px-4 py-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B]/95 min-w-[210px] shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md hover:border-[#00FF88]/40 transition-all duration-300 cursor-grab active:cursor-grabbing select-none text-left group">
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                className="!bg-[#00FF88] !border-2 !border-[#0A0A0B] !w-2 !h-2 !-left-1"
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                className="!bg-[#00FF88] !border-2 !border-[#0A0A0B] !w-2 !h-2 !-right-1"
            />

            <div className="flex items-center gap-3">
                <div
                    className={`p-2 rounded-lg shrink-0 ${
                        isTrigger
                            ? 'bg-[#FF4A6B]/10 text-[#FF4A6B] border border-[#FF4A6B]/20'
                            : 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20'
                    }`}
                >
                    {isTrigger ? (
                        <Zap size={14} className="animate-pulse" />
                    ) : (
                        getAgentIcon(data.id || '', data.label)
                    )}
                </div>

                <div className="overflow-hidden flex-1">
                    <p className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider truncate mb-0.5">
                        {cleanTypeName}
                    </p>
                    <p className="text-xs font-bold text-[#F0F0F2] tracking-wide truncate group-hover:text-[#00FF88] transition-colors">
                        {data.label}
                    </p>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#1E1E24] to-transparent group-hover:via-[#00FF88]/50 transition-all duration-500 rounded-b-xl" />
        </div>
    );
}