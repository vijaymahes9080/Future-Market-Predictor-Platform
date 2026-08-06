import React, { useEffect, useRef, useState } from 'react';
import { TechnologyItem } from '../types';
import { Network, Sparkles, Filter, Info } from 'lucide-react';
import { Network as VisNetwork, DataSet } from 'vis-network/standalone';

interface KnowledgeGraphViewProps {
  technologies: TechnologyItem[];
  onSelectTechnology: (tech: TechnologyItem) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ technologies, onSelectTechnology }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Construct vis-network nodes and edges from technologies
    const nodesArray: any[] = [];
    const edgesArray: any[] = [];

    technologies.forEach((tech, idx) => {
      // Main Tech Node
      const techNodeId = `tech-${tech.id}`;
      nodesArray.push({
        id: techNodeId,
        label: tech.technologyName,
        group: 'technology',
        shape: 'dot',
        size: 30,
        color: { background: '#6366f1', border: '#818cf8' },
        font: { color: '#ffffff', size: 14, face: 'Outfit' }
      });

      // Company Nodes
      tech.majorCompanies.slice(0, 2).forEach((comp, cIdx) => {
        const compId = `comp-${tech.id}-${cIdx}`;
        nodesArray.push({
          id: compId,
          label: comp,
          group: 'company',
          shape: 'diamond',
          size: 18,
          color: { background: '#10b981', border: '#34d399' },
          font: { color: '#e2e8f0', size: 11, face: 'Inter' }
        });
        edgesArray.push({ from: techNodeId, to: compId, color: { color: '#334155' }, dashes: true });
      });

      // University Nodes
      tech.leadingUniversities.slice(0, 2).forEach((uni, uIdx) => {
        const uniId = `uni-${tech.id}-${uIdx}`;
        nodesArray.push({
          id: uniId,
          label: uni,
          group: 'university',
          shape: 'triangle',
          size: 18,
          color: { background: '#a855f7', border: '#c084fc' },
          font: { color: '#e2e8f0', size: 11, face: 'Inter' }
        });
        edgesArray.push({ from: techNodeId, to: uniId, color: { color: '#334155' } });
      });
    });

    // Add inter-tech edges for cross-disciplinary convergence
    edgesArray.push({ from: 'tech-tech-agentic-ai', to: 'tech-tech-humanoid-robotics', label: 'VLA Cognition', font: { color: '#94a3b8', size: 10 }, color: { color: '#6366f1' } });
    edgesArray.push({ from: 'tech-tech-agentic-ai', to: 'tech-tech-edge-ai-tinyml', label: 'On-Device Quantization', font: { color: '#94a3b8', size: 10 }, color: { color: '#6366f1' } });
    edgesArray.push({ from: 'tech-tech-quantum-computing', to: 'tech-tech-synthetic-biology', label: 'Molecular Folding', font: { color: '#94a3b8', size: 10 }, color: { color: '#a855f7' } });

    const data = {
      nodes: new DataSet(nodesArray),
      edges: new DataSet(edgesArray)
    };

    const options = {
      nodes: {
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 1.5,
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.5
        }
      },
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -3000,
          springLength: 120
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200
      }
    };

    const network = new VisNetwork(containerRef.current, data, options);

    network.on('selectNode', (params) => {
      const nodeId = params.nodes[0];
      if (nodeId && nodeId.startsWith('tech-')) {
        const cleanId = nodeId.replace('tech-', '');
        const found = technologies.find(t => t.id === cleanId);
        if (found) {
          setSelectedNodeInfo(`Technology: ${found.technologyName} (Score: ${found.scores.overallOpportunityScore}/100)`);
          onSelectTechnology(found);
        }
      } else {
        setSelectedNodeInfo(`Selected Node: ${nodeId}`);
      }
    });

    return () => {
      network.destroy();
    };
  }, [technologies]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <span>KNOWLEDGE GRAPH & TECHNOLOGY TREES</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing inter-disciplinary technology convergence across papers, patents, companies, and universities.
          </p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500" /><span>Technologies</span></span>
          <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /><span>Companies</span></span>
          <span className="flex items-center space-x-1.5"><span className="w-3 h-3 rounded-full bg-purple-500" /><span>Universities</span></span>
        </div>
      </div>

      {/* Vis Network Container */}
      <div className="glass-panel p-4 rounded-2xl relative">
        {selectedNodeInfo && (
          <div className="absolute top-6 left-6 z-10 bg-slate-900/90 border border-indigo-500/40 p-3 rounded-xl text-xs text-indigo-300 font-mono shadow-lg flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>{selectedNodeInfo}</span>
          </div>
        )}
        <div ref={containerRef} className="w-full h-[600px] rounded-xl bg-slate-950/80 border border-slate-800/80" />
      </div>
    </div>
  );
};
