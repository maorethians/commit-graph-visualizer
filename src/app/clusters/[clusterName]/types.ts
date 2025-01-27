export interface Node {
  id: string;
  content: string;
  nodeType: 'BASE' | 'CONTEXT' | 'AGGREGATOR' | 'EXTENSION';
  aggregatorId?: string;
}

export interface Edge {
  sourceId: string;
  targetId: string;
  type: string;
  weight: number;
}
