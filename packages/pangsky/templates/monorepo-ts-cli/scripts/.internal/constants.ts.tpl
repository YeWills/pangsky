import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: '{{pkgName}}-scripts bundleDeps',
  DEV: '{{pkgName}}-scripts todo dev',
  BUILD: '{{pkgName}}-scripts build',
} as const;
