'use server';

import fs from 'fs';

export const getClusterDir = async () => {
  return fs.readdirSync('./src/app/json');
};
