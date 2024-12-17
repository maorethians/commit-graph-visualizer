'use client';

import cytoscape from 'cytoscape';
import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Node, Edge } from '@/app/context/types';

export const CytoscapeGraph = ({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const cyRef = useRef(null);

  useEffect(() => {}, [nodes, edges]);

  console.log(edges.length);

  const allNodes = [];
  nodes.forEach((node) => {
    allNodes.push({
      data: {
        id: node.id,
      },
    });
  });

  const elements: cytoscape.CytoscapeOptions['elements'] = [
    ...allNodes,
    ...edges.map((edge) => ({
      data: {
        source: edge.sourceId,
        target: edge.targetId,
      },
    })),
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      layout={{
        name: 'cose',
        nodeDimensionsIncludeLabels: true,
        componentSpacing: 500,
        nodeRepulsion: () => 500000000,
        // nodeOverlap: 0,
        // idealEdgeLength: 32,
      }}
      style={{ width: '100%', height: '1000px' }}
      stylesheet={[
        {
          selector: 'node',
          style: {
            'background-color': '#2C2C2C',
            label: 'data(id)',
            'text-wrap': 'wrap',
            'text-justification': 'left',
            color: 'white',
            'font-size': '5px',
            shape: 'rectangle',
            'max-height': '200px',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            color: 'white',
            'font-size': '3px',
            opacity: 0.5,
          },
        },
      ]}
      cy={(cy) => (cyRef.current = cy)}
    />
  );
};
