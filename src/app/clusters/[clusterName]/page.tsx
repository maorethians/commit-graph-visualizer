'use server';

import { CytoscapeGraph } from './Cytoscape';
import { getCluster } from '@/app/clusters/[clusterName]/fetch';

export default async function Home({ params }) {
  const { clusterName } = await params;
  const { nodes, edges } = await getCluster(clusterName);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CytoscapeGraph nodes={nodes} edges={edges} />
    </div>
  );
}
