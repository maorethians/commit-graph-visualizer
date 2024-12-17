export interface Node {
  id: string;
  hunk: string;
  isContext: boolean;
}

export interface Edge {
  sourceId: string;
  targetId: string;
  type: string;
  weight: number;
}
