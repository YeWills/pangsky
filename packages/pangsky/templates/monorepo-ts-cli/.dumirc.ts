// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  resolve: {
    atomDirs: [{ type: 'pkg', dir: 'packages' }],
    docDirs: ['docs'],
  },
  themeConfig: {
    name: '工具库',
  },
});
