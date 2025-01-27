'use server';

import fs from 'fs';
import { Node, Edge } from '@/app/clusters/[clusterName]/types';

export const getCluster = async (clusterName: string) => {
  return JSON.parse(
    fs.readFileSync(`./src/app/json/${clusterName}.json`).toString()
  ) as {
    nodes: Node[];
    edges: Edge[];
  };
};
