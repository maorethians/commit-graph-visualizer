'use server';

import { getClusterDir } from '@/app/fetch';
import Link from 'next/link';

export default async function Home() {
  const clusters = await getClusterDir();
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {clusters.map((cluster) => {
        const clusterName = cluster.replace('.json', '');
        return (
          <Link
            href={`/clusters/${clusterName}`}
            key={clusterName}
            style={{
              width: '300px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              margin: '10px',
              border: '1px solid white',
              borderRadius: '5px',
              background: '#2C2C2C',
            }}
          >
            {clusterName}
          </Link>
        );
      })}
    </div>
  );
}
