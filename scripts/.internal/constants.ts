import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: 'umi-scripts bundleDeps',
  DEV: 'umi-scripts father dev',
  BUILD: 'umi-scripts father build',
} as const;
