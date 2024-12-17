'use client';

import cytoscape from 'cytoscape';
import { Edge, Node } from '@/app/types';
import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const typeColor = {
  DEF_USE: '#E67E22',
  SIMILARITY: '#5DADE2',
  HIERARCHICAL: '#58D68D',
  CLASS_USE: '#F1C40F',
  CONTEXT: '#9B59B6',
};

const highlighter = (): boolean => false;

export const CytoscapeGraph = ({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const cyRef = useRef(null);

  useEffect(() => {}, [nodes, edges]);

  const allNodes = [];
  nodes.forEach((node) => {
    // allNodes.push(
    //   ...node.contexts.map((context, index) => ({
    //     data: {
    //       id: `${node.id}-${index}`,
    //       hunk: context,
    //       parent: `${node.id}-${index + 1}`,
    //       backgroundColor: highlighter(node) ? '#8C8C8C' : '#2C2C2C',
    //     },
    //   }))
    // );

    let nodeColor = '#2C2C2C';
    if (highlighter(node)) {
      nodeColor = '#4A0D0D';
    }
    if (node.isContext) {
      nodeColor = '#3E1F47';
    }

    allNodes.push({
      data: {
        id: `${node.id}-parent`,
        hunk: node.id,
        backgroundColor: nodeColor,
      },
    });
    allNodes.push({
      data: {
        id: node.id,
        hunk: node.hunk,
        parent: `${node.id}-parent`,
        backgroundColor: nodeColor,
      },
    });
  });

  const elements: cytoscape.CytoscapeOptions['elements'] = [
    ...allNodes,
    ...edges
      .filter((edge) => edge.weight > 0.5)
      .map((edge) => {
        let label = '';
        if (edge.type == 'SIMILARITY') {
          label += edge.weight;
        }

        return {
          data: {
            source: edge.sourceId,
            target: edge.targetId,
            label,
            color: typeColor[edge.type as keyof typeof typeColor] ?? 'white',
          },
        };
      }),
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
            'background-color': 'data(backgroundColor)',
            label: 'data(hunk)',
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
