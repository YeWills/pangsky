import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: 'psky-scripts bundleDeps',
  DEV: 'psky-scripts father dev',
  BUILD: 'psky-scripts father build',
} as const;
