'use server';

import { CytoscapeGraph } from '@/app/context/Cytoscape';
import { getContext } from '@/app/context/fetch';

export default async function Home() {
  const { nodes, edges } = await getContext();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CytoscapeGraph nodes={nodes} edges={edges} />
    </div>
  );
}
