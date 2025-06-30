import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useFlowchart } from './Visual';

const FlowChart = () => {
  const chartContainerRef = useRef(null);
  const { flowchart } = useFlowchart();

  useEffect(() => {
    if (!flowchart || !chartContainerRef.current) return;

    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false });

    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render('generatedChart', flowchart);
        chartContainerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render error:", err);
        chartContainerRef.current.innerHTML = `<pre>${flowchart}</pre>`; // fallback
      }
    };

    renderMermaid();
  }, [flowchart]);

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div ref={chartContainerRef} />
    </div>
  );
};

export default FlowChart;
