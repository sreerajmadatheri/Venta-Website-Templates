import { X, Copy, Check, Terminal, AlertCircle } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WorkflowNode from './WorkflowNode';
import AnimatedBezierEdge from './AnimatedBezierEdge';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  workflowData: any;
}

export default function WorkflowModal({
                                        isOpen,
                                        onClose,
                                        projectName,
                                        workflowData,
                                      }: WorkflowModalProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'canvas' | 'json'>('canvas');

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const nodeTypes = useMemo(() => ({ n8nNode: WorkflowNode }), []);
  const edgeTypes = useMemo(() => ({ animatedBezier: AnimatedBezierEdge }), []);

  function parseWorkflow(data: any): { parsedNodes: Node[]; parsedEdges: Edge[] } {
    let targetData = data;
    if (typeof targetData === 'object' && targetData !== null) {
      if ('workflowData' in targetData) targetData = targetData.workflowData;
      else if ('json' in targetData) targetData = targetData.json;
    }
    if (typeof targetData === 'string') {
      try {
        targetData = JSON.parse(targetData.trim());
      } catch (e) {
        console.error('Failed to parse workflow string JSON:', e);
      }
    }

    const n8nNodes = targetData?.nodes || [];
    const n8nConnections = targetData?.connections || {};
    const parsedNodes: Node[] = [];
    const parsedEdges: Edge[] = [];

    const isHubArchitecture = n8nNodes.some(
        (n: any) => n.isCenter || n.target || n.source
    );

    if (isHubArchitecture) {
      n8nNodes.forEach((node: any) => {
        parsedNodes.push({
          id: node.id || node.name,
          type: 'n8nNode',
          position: {
            x: Array.isArray(node.position) ? node.position[0] : 0,
            y: Array.isArray(node.position) ? node.position[1] : 0,
          },
          data: {
            id: node.id,
            label: node.name,
            type: node.type,
            subtitle: node.subtitle,
            isCenter: node.isCenter,
          },
        });

        if (node.target) {
          parsedEdges.push({
            id: `edge-${node.id}-${node.target}`,
            source: node.id,
            target: node.target,
            sourceHandle: 'right',
            targetHandle: 'left',
            type: 'animatedBezier',
          });
        }

        if (node.source) {
          parsedEdges.push({
            id: `edge-${node.source}-${node.id}`,
            source: node.source,
            target: node.id,
            sourceHandle: 'right',
            targetHandle: 'left',
            type: 'animatedBezier',
          });
        }
      });
    } else {
      n8nNodes.forEach((node: any) => {
        parsedNodes.push({
          id: node.name,
          type: 'n8nNode',
          position: {
            x: Array.isArray(node.position) ? node.position[0] : 0,
            y: Array.isArray(node.position) ? node.position[1] : 0,
          },
          data: { label: node.name, type: node.type },
        });
      });

      Object.entries(n8nConnections).forEach(
          ([sourceName, targetConnections]: [string, any]) => {
            if (targetConnections?.main && Array.isArray(targetConnections.main)) {
              targetConnections.main.forEach((branch: any[]) => {
                if (Array.isArray(branch)) {
                  branch.forEach((conn: any) => {
                    if (conn && conn.node) {
                      parsedEdges.push({
                        id: `edge-${sourceName}-${conn.node}`,
                        source: sourceName,
                        target: conn.node,
                        sourceHandle: 'right',
                        targetHandle: 'left',
                        type: 'animatedBezier',
                      });
                    }
                  });
                }
              });
            }
          }
      );
    }

    return { parsedNodes, parsedEdges };
  }

  const { rawJsonString, executionTicker, hasData } = useMemo(() => {
    if (!workflowData) {
      return { rawJsonString: '', executionTicker: '', hasData: false };
    }

    try {
      let targetData = workflowData;
      if (typeof targetData === 'object' && targetData !== null) {
        if ('workflowData' in targetData) targetData = targetData.workflowData;
        else if ('json' in targetData) targetData = targetData.json;
      }

      if (typeof targetData === 'string') {
        targetData = JSON.parse(targetData.trim());
      }

      const rawJsonString = JSON.stringify(targetData, null, 2);
      const executionTicker = targetData.executionTicker || '';
      const nodeCount = targetData.nodes?.length || 0;

      return {
        rawJsonString,
        executionTicker,
        hasData: nodeCount > 0,
      };
    } catch (e) {
      return {
        rawJsonString: String(workflowData),
        executionTicker: '',
        hasData: false,
      };
    }
  }, [workflowData]);

  useEffect(() => {
    if (workflowData) {
      const { parsedNodes, parsedEdges } = parseWorkflow(workflowData);
      setNodes(parsedNodes);
      setEdges(parsedEdges);
    }
  }, [workflowData, setNodes, setEdges]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(rawJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative w-full max-w-5xl h-[80vh] min-h-[540px] rounded-2xl border border-[#1E1E24] bg-[#070709] flex flex-col overflow-hidden shadow-2xl z-10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E24] bg-[#0A0A0B] shrink-0">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-[#00FF88]" />
              <div>
              <span className="font-mono text-[10px] text-[#00FF88] tracking-widest uppercase">
                // INTERACTIVE SYSTEM WORKSPACE
              </span>
                <h3 className="text-lg font-bold text-[#F0F0F2]">
                  {projectName || 'Workflow Canvas'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#141419] border border-[#1E1E24] p-1 rounded-lg font-mono text-[11px]">
                <button
                    onClick={() => setViewMode('canvas')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        viewMode === 'canvas'
                            ? 'bg-[#00FF88]/10 text-[#00FF88] font-bold'
                            : 'text-[#6B7280] hover:text-[#9CA3AF]'
                    }`}
                >
                  Canvas Blueprint
                </button>
                <button
                    onClick={() => setViewMode('json')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        viewMode === 'json'
                            ? 'bg-[#00FF88]/10 text-[#00FF88] font-bold'
                            : 'text-[#6B7280] hover:text-[#9CA3AF]'
                    }`}
                >
                  Raw JSON
                </button>
              </div>

              {viewMode === 'json' && (
                  <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E1E24] bg-[#141419] text-xs font-mono text-[#9CA3AF] hover:text-[#F0F0F2] transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-[#00FF88]" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
              )}

              <button
                  onClick={onClose}
                  className="text-[#6B7280] hover:text-[#F0F0F2] transition-colors p-1.5 rounded-lg border border-transparent hover:border-[#1E1E24] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative bg-[#070709]">
            {hasData ? (
                viewMode === 'canvas' ? (
                    <div className="w-full h-full">
                      <ReactFlow
                          nodes={nodes}
                          edges={edges}
                          onNodesChange={onNodesChange}
                          onEdgesChange={onEdgesChange}
                          nodeTypes={nodeTypes}
                          edgeTypes={edgeTypes}
                          nodesDraggable={true}
                          nodesConnectable={false}
                          elementsSelectable={true}
                          fitView
                          fitViewOptions={{ padding: 0.35 }}
                          minZoom={0.3}
                          maxZoom={1.5}
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
                  <p className="text-xs text-[#6B7280] mt-1">
                    No valid node graph or JSON structure found in workflow payload.
                  </p>
                </div>
            )}
          </div>

          {executionTicker && (
              <div className="px-6 py-2.5 bg-[#0A0A0B] border-t border-[#1E1E24] flex items-center justify-between font-mono text-[11px] text-[#8B9CFF] shrink-0">
                <span className="truncate">{executionTicker}</span>
                <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]"></span>
            </span>
              </div>
          )}
        </div>
      </div>
  );
}