import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import WorkflowModal from './WorkflowModal';

// Using the test json workflow file for testing layout pipeline
import erpWorkflowData from './test-workflow.json';

const cases = [
  {
    client: 'ERP System Updation',
    industry: 'Enterprise IT',
    result: 'Automation of office work and regular updation across corporate databases with zero human intervention.',
    tech: ['API Sync', 'Data Pipeline', 'Workflows'],
    color: '#A855F7',
    workflow: erpWorkflowData
  },
  {
    client: 'Apex Analytics',
    industry: 'Financial Services',
    result: 'Deployed an automated reconciliation engine that matches cross-border multi-currency transactions, cutting end-of-month processing from days to minutes.',
    tech: ['Ledger Sync', 'Risk Vector', 'Automated Audit'],
    color: '#0EA5E9',
    workflow: {
      meta: { instanceId: "venta_fin_reconcile_02" },
      nodes: [{ parameters: {}, id: "cron-02", name: "Interval Ledger Pull", type: "n8n-nodes-base.cron", typeVersion: 1 }],
      connections: {}
    }
  },
  {
    client: 'Vanguard Media Labs',
    industry: 'AI Marketing',
    result: 'Architected a multi-channel content generation and digital marketing engine that dynamically localizes ad copies, scaling campaign throughput by 300%.',
    tech: ['LLM Copy', 'Trend Ingest', 'Ad Analytics'],
    color: '#00FF88',
    workflow: {
      meta: { instanceId: "venta_mkt_generation_03" },
      nodes: [{ parameters: {}, id: "rss-03", name: "Trend Engine Aggregator", type: "n8n-nodes-base.rssFeed", typeVersion: 1 }],
      connections: {}
    }
  },
  {
    client: 'Stratis Corp',
    industry: 'Business Consultancy',
    result: 'Helping organizations use technology to solve business problems, achieve their goals, and create new value through optimized autonomous operating structures.',
    tech: ['IT Consultancy', 'Process Audit', 'ROI Modeling'],
    color: '#F59E0B',
    workflow: {
      meta: { instanceId: "venta_biz_consult_04" },
      nodes: [{ parameters: {}, id: "manual-04", name: "Process Audit Trigger", type: "n8n-nodes-base.manualTrigger", typeVersion: 1 }],
      connections: {}
    }
  },
];

export default function CaseStudies() {
  const { ref: headingRef, visible: headingVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeWorkflow, setActiveWorkflow] = useState<any | null>(null);
  const [activeProject, setActiveProject] = useState<string>('');

  const handleCardClick = (projectName: string, workflowPayload: any) => {
    setActiveProject(projectName);
    setActiveWorkflow(workflowPayload);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Timeout keeps data intact until modal close animations finish cleanly
    setTimeout(() => {
      setActiveWorkflow(null);
      setActiveProject('');
    }, 400);
  };

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className={`reveal ${headingVisible ? 'visible' : ''} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16`}>
          <div>
            <p className="section-label">CASE STUDIES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F2] tracking-tight">
              Real deployments,<br />
              <span className="text-gradient">proven metrics</span>
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm max-w-xs leading-relaxed">
            We partner with teams looking to move past sandboxes and deploy actual utility. Click any card to inspect its integration blueprint.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <div
              key={c.client}
              onClick={() => handleCardClick(c.client, c.workflow)}
              className={`card-glow p-7 flex flex-col justify-between min-h-[300px] group cursor-pointer reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''} hover:border-[#00FF88]/30 transition-all duration-300`}
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-[11px] text-[#6B7280] tracking-wider">//2026</span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{ color: c.color, borderColor: `${c.color}30`, background: `${c.color}08` }}
                  >
                    {c.industry.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F0F0F2] mb-3 group-hover:text-[#00FF88] transition-colors duration-200">{c.client}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{c.result}</p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1E1E24]/60">
                <div className="flex flex-wrap gap-1.5">
                  {c.tech.slice(0, 2).map((t) => (
                    <span key={t} className="font-mono text-[9px] text-[#9CA3AF] bg-[#1A1A20] border border-[#1E1E24] px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#6B7280] group-hover:text-[#00FF88] transition-colors flex items-center gap-1">
                  Blueprint &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WorkflowModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectName={activeProject}
        workflowData={activeWorkflow}
      />
    </section>
  );
}