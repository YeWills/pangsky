import { spawnSync } from './.internal/utils';

(async () => {
  const args = process.argv.slice(2);

  let command = `babel src --out-dir dist --extensions ".ts"`;

  if (args.length) {
    command = `babel ${args.join(' ')} --extensions ".ts"`;
  }

  spawnSync(command, { cwd: process.cwd() });
})();
