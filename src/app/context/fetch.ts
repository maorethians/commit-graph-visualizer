'use server';

import fs from 'fs';
import { Node, Edge } from '@/app/context/types';

export const getContext = async () => {
  return JSON.parse(
    fs.readFileSync('./src/app/context/context.json').toString()
  ) as {
    nodes: Node[];
    edges: Edge[];
  };
};
