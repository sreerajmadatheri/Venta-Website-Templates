import { X, Copy, Check, Terminal, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { ReactFlow, Background, Controls, Handle, Position } from '@xyflow/react';
import { ArrowRight, Zap } from 'lucide-react';
import '@xyflow/react/dist/style.css';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  workflowData: any;
}

// Custom Node Component
const WorkflowNode = ({ data }: any) => {
  const isTrigger = data.type?.includes('trigger') || data.type?.includes('cron') || data.type?.includes('webhook');
  const cleanTypeName = data.type?.replace('n8n-nodes-base.', '').replace('Trigger', '') || 'Node';

  return (
    <div className="relative px-5 py-3.5 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] min-w-[220px] shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-[#00FF88]/40 transition-all duration-300 group select-none text-left">

      {/* Explicit Connection Handle Targets for Edge Snapping */}
      {!isTrigger && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-[#1E1E24] !w-2 !h-2 !border !border-[#070709] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: '-4px' }}
        />
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[#00FF88] !w-2 !h-2 !border !border-[#070709] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#00FF88]"
        style={{ right: '-4px' }}
      />

      <div className="flex items-center gap-3.5">
        {/* Node Icon Box Layout */}
        <div className={`p-2 rounded-lg shrink-0 ${isTrigger ? 'bg-[#FF4A6B]/10 text-[#FF4A6B] border border-[#FF4A6B]/20' : 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20'}`}>
          {isTrigger ? <Zap size={14} /> : <ArrowRight size={14} />}
        </div>

        {/* Text Labels Structure */}
        <div className="overflow-hidden flex-1">
          <p className="text-[9px] font-mono text-[#52525B] uppercase tracking-widest truncate mb-0.5">
            {cleanTypeName}
          </p>
          <p className="text-xs font-bold text-[#E4E4E7] tracking-wide truncate group-hover:text-[#00FF88] transition-colors">
            {data.label}
          </p>
        </div>
      </div>

      {/* Subtle bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1E1E24] to-transparent group-hover:via-[#00FF88]/40 transition-all duration-500 rounded-b-xl" />
    </div>
  );
};

export default function WorkflowModal({ isOpen, onClose, projectName, workflowData }: WorkflowModalProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'canvas' | 'json'>('canvas');

  // Changing type from 'default' to 'n8nNode' bypasses the built-in white container block styles
  const nodeTypes = useMemo(() => ({ n8nNode: WorkflowNode }), []);

  const { nodes, edges, rawJsonString, hasData } = useMemo(() => {
    if (!workflowData) return { nodes: [], edges: [], rawJsonString: '', hasData: false };

    try {
      let TargetData = workflowData;
      if (typeof TargetData === 'object' && TargetData !== null) {
        if ('workflowData' in TargetData) TargetData = TargetData.workflowData;
        else if ('json' in TargetData) TargetData = TargetData.json;
      }

      if (typeof TargetData === 'string') {
        TargetData = JSON.parse(TargetData.trim());
      }

      const rawJsonString = JSON.stringify(TargetData, null, 2);
      const n8nNodes = TargetData.nodes || [];
      const n8nConnections = TargetData.connections || {};

      // Transform Nodes (Assigned type: 'n8nNode')
      const flowNodes = n8nNodes.map((node: any) => ({
        id: node.name,
        type: 'n8nNode',
        position: {
          x: Array.isArray(node.position) ? node.position[0] * 1.5 : 0,
          y: Array.isArray(node.position) ? node.position[1] * 1.5 : 0
        },
        data: { label: node.name, type: node.type },
      }));

      // Transform Connections
      const flowEdges: any[] = [];
      Object.entries(n8nConnections).forEach(([sourceName, targetConnections]: [string, any]) => {
        if (targetConnections?.main && Array.isArray(targetConnections.main)) {
          targetConnections.main.forEach((branch: any[]) => {
            if (Array.isArray(branch)) {
              branch.forEach((conn: any) => {
                if (conn && conn.node) {
                  flowEdges.push({
                    id: `edge-${sourceName}-${conn.node}`,
                    source: sourceName,
                    target: conn.node,
                    animated: true,
                    style: { stroke: '#27272A', strokeWidth: 1.5 },
                  });
                }
              });
            }
          });
        }
      });

      return {
        nodes: flowNodes,
        edges: flowEdges,
        rawJsonString,
        hasData: flowNodes.length > 0,
      };
    } catch (e) {
      console.error("Canvas parsing error:", e);
      return { nodes: [], edges: [], rawJsonString: String(workflowData), hasData: false };
    }
  }, [workflowData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-[80vh] min-h-[520px] rounded-2xl border border-[#1E1E24] bg-[#070709] flex flex-col overflow-hidden shadow-2xl z-10">

        {/* Header Block Layer */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E24] bg-[#0A0A0B] shrink-0">
          <div className="flex items-center gap-3">
            <Terminal size={16} className="text-[#00FF88]" />
            <div>
              <span className="font-mono text-[10px] text-[#00FF88] tracking-widest uppercase">// INTERACTIVE SYSTEM WORKSPACE</span>
              <h3 className="text-lg font-bold text-[#F0F0F2]">{projectName || 'Workflow Canvas'}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#141419] border border-[#1E1E24] p-1 rounded-lg font-mono text-[11px]">
              <button
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'canvas' ? 'bg-[#00FF88]/10 text-[#00FF88] font-bold' : 'text-[#6B7280] hover:text-[#9CA3AF]'}`}
              >
                Canvas Blueprint
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${viewMode === 'json' ? 'bg-[#00FF88]/10 text-[#00FF88] font-bold' : 'text-[#6B7280] hover:text-[#9CA3AF]'}`}
              >
                Raw JSON
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#F0F0F2] transition-colors p-1.5 rounded-lg border border-transparent hover:border-[#1E1E24] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Workspace Display Body */}
        <div className="flex-1 overflow-hidden relative bg-[#070709]">
          {hasData ? (
            viewMode === 'canvas' ? (
              <div className="w-full h-full">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.4 }}
                  minZoom={0.3}
                  maxZoom={1.2}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background color="#1F1F23" gap={20} size={1} />
                  <Controls className="!bg-[#0A0A0B] !border-[#1E1E24] !rounded-xl opacity-90 [&_button]:!border-[#1E1E24] [&_button]:!bg-[#141419] [&_svg]:!fill-[#9CA3AF]" />
                </ReactFlow>
              </div>
            ) : (
              <div className="w-full h-full p-6 overflow-auto">
                <pre className="font-mono text-xs text-[#8E939E] bg-[#0A0A0B]/90 p-5 rounded-xl border border-[#1E1E24] leading-relaxed whitespace-pre text-left">
                  <code>{rawJsonString}</code>
                </pre>
              </div>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#070709]">
              <AlertCircle size={24} className="text-[#F59E0B] mb-2 animate-pulse" />
              <p className="text-sm font-semibold text-[#F0F0F2]">Parsing Pipeline Halted</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}