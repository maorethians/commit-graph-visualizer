'use server';

import fs from 'fs';
import { Edge, Node } from '@/app/types';

export const getGraph = async () => {
  return JSON.parse(fs.readFileSync('./src/app/graph.json').toString()) as {
    nodes: Node[];
    edges: Edge[];
  };
};
