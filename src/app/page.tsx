'use server';

import { getGraph } from '@/app/fetch';
import { CytoscapeGraph } from '@/app/Cytoscape';

export default async function Home() {
  const { nodes, edges } = await getGraph();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CytoscapeGraph nodes={nodes} edges={edges} />
    </div>
  );
}
