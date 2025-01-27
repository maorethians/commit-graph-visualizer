'use client';

import cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Node, Edge } from '@/app/clusters/[clusterName]/types';

const edgeColors = {
  DEF_USE: '#E67E22',
  SIMILARITY: '#5DADE2',
  SUCCESSION: '#58D68D',
  CONTEXT: '#9B59B6',
  EXPANSION: '#F4D03F',
};

const nodeColors = {
  base: '#2C2C2C',
  context: '#3E1F47',
  extension: '#1F3E47',
  highlight: '#4A0D0D',
};

const highlighter = (node: Node): boolean => node.id.includes('2584');

export const CytoscapeGraph = ({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) => {
  const cyRef = useRef(null);
  const [selectedAggregators, setSelectedAggregators] = useState(
    [] as string[]
  );

  useEffect(() => {}, [nodes, edges]);

  useEffect(() => {
    const cy = cyRef.current;
    if (cy) {
      cy.on('tap', 'node', (event) => {
        const clickedNode = event.target;
        const { id: nodeId, isAggregator } = clickedNode.data();
        const id = nodeId.endsWith('-parent') ? nodeId.slice(0, -7) : nodeId;

        if (isAggregator) {
          setSelectedAggregators((prev) =>
            prev.includes(id)
              ? prev.filter((prevId) => prevId !== id)
              : [...prev, id]
          );
        }
      });
    }
  }, []);

  const graphNodes: cytoscape.CytoscapeOptions['elements'] = [];
  nodes.forEach((node) => {
    // if (!node.isAggregator) {
    //   return;
    // }

    if (node.aggregatorId && !selectedAggregators.includes(node.aggregatorId)) {
      return;
    }

    let nodeColor: string;
    console.log(node.nodeType);
    switch (node.nodeType) {
      case 'CONTEXT':
        nodeColor = nodeColors.context;
        break;
      case 'EXTENSION':
        nodeColor = nodeColors.extension;
        break;
      default:
        nodeColor = nodeColors.base;
    }

    if (highlighter(node) || selectedAggregators.includes(node.id)) {
      nodeColor = nodeColors.highlight;
    }

    graphNodes.push({
      data: {
        id: `${node.id}-parent`,
        content: node.id,
        backgroundColor: nodeColor,
        isAggregator: node.nodeType === 'AGGREGATOR',
        aggregatorId: node.aggregatorId,
      },
    });
    graphNodes.push({
      data: {
        id: node.id,
        content: node.content,
        parent: `${node.id}-parent`,
        backgroundColor: nodeColor,
        isAggregator: node.nodeType === 'AGGREGATOR',
        aggregatorId: node.aggregatorId,
      },
    });
  });

  const graphNodeIds = graphNodes.map((node) => node.data.id!);
  const elements: cytoscape.CytoscapeOptions['elements'] = [
    ...graphNodes,
    ...edges
      .filter((edge) => edge.weight > 0.5)
      .filter((edge) => {
        const { sourceId, targetId } = edge;
        return (
          graphNodeIds.includes(sourceId) && graphNodeIds.includes(targetId)
        );
      })
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
            color: edgeColors[edge.type as keyof typeof edgeColors] ?? 'white',
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
        edgeElasticity: 5000,
        // nodeOverlap: 0,
        // idealEdgeLength: 32,
      }}
      style={{ width: '100%', height: '1000px' }}
      stylesheet={[
        {
          selector: 'node',
          style: {
            'background-color': 'data(backgroundColor)',
            label: 'data(content)',
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
