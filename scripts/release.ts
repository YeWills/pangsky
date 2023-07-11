import * as logger from '@pskyjs/utils/src/logger';
import getGitRepoInfo from 'git-repo-info';
import { join } from 'path';
import rimraf from 'rimraf';
import 'zx/globals';
import { PATHS } from './.internal/constants';
import { assert, eachPkg, getPkgs } from './.internal/utils';

(async () => {
  const { branch } = getGitRepoInfo();
  logger.info(`branch: ${branch}`);
  const pkgs = getPkgs();
  logger.info(`pkgs: ${pkgs.join(', ')}`);

  // check git status
  logger.event('check git status');
  const isGitClean = (await $`git status --porcelain`).stdout.trim().length;
  assert(!isGitClean, 'git status is not clean');

  // check npm registry
  logger.event('check npm registry');
  const registry = (await $`npm config get registry`).stdout.trim();
  assert(
    registry === 'https://registry.npmjs.org/',
    'npm registry is not https://registry.npmjs.org/',
  );

  // check package changed
  logger.event('check package changed');
  const changed = (await $`lerna changed --loglevel error`).stdout.trim();
  assert(changed, `no package is changed`);

  // clean
  logger.event('clean');
  eachPkg(pkgs, ({ dir, name }) => {
    logger.info(`clean dist of ${name}`);
    rimraf.sync(join(dir, 'dist'));
  });

  // build packages
  logger.event('build packages');
  await $`npm run build:release`;
  // 生成声明文件
  await $`npm run tsc`;
  // await $`npm run build:extra`;
  //
  logger.event('check client code change');
  const isGitCleanAfterClientBuild = (
    await $`git status --porcelain`
  ).stdout.trim().length;
  assert(!isGitCleanAfterClientBuild, 'client code is updated');

  // bump version
  logger.event('bump version');
  await $`lerna version --exact --no-commit-hooks --no-git-tag-version --no-push --loglevel error`;
  const version = require(PATHS.LERNA_CONFIG).version;
  let tag = 'latest';
  if (
    version.includes('-alpha.') ||
    version.includes('-beta.') ||
    version.includes('-rc.')
  ) {
    tag = 'next';
  }
  if (version.includes('-canary.')) tag = 'canary';

  // update pnpm lockfile
  logger.event('update pnpm lockfile');
  $.verbose = false;
  await $`pnpm i`;
  $.verbose = true;

  // commit
  logger.event('commit');
  await $`git commit --all --message "release: ${version}"`;

  // git tag
  if (tag !== 'canary') {
    logger.event('git tag');
    // await $`git tag v${version}`;
  }

  // git push todo 网络好时，可以放开
  // logger.event('git push');
  // await $`git push origin ${branch} --tags`;

  // npm publish
  logger.event('pnpm publish');
  $.verbose = false;
  const innerPkgs = pkgs;

  // check 2fa config
  let otpArg: string[] = [];
  // if (
  //   (await $`npm profile get "two-factor auth"`).toString().includes('writes')
  // ) {
  //   let code = '';
  //   do {
  //     // get otp from user
  //     code = await question('This operation requires a one-time password: ');
  //     // generate arg for zx command
  //     // why use array? https://github.com/google/zx/blob/main/docs/quotes.md
  //     otpArg = ['--otp', code];
  //   } while (code.length !== 6);
  // }

  await Promise.all(
    innerPkgs.map(async (pkg) => {
      // await $`cd packages/${pkg} && npm publish --tag ${tag}`;
      logger.info(`+ ${pkg}`);
    }),
  );
  // await $`cd packages/umi && npm publish --tag ${tag} ${otpArg}`;
  // logger.info(`+ umi`);
  // await $`cd packages/max && npm publish --tag ${tag} ${otpArg}`;
  // logger.info(`+ @umijs/max`);
  $.verbose = true;

  // sync tnpm
  // logger.event('sync tnpm');
  $.verbose = false;
  // await Promise.all(
  //   pkgs.map(async (pkg) => {
  //     const { name } = require(path.join(PATHS.PACKAGES, pkg, 'package.json'));
  //     logger.info(`sync ${name}`);
  //     await $`tnpm sync ${name}`;
  //   }),
  // );
  $.verbose = true;
})();

function setDepsVersion(opts: {
  deps: string[];
  pkg: Record<string, any>;
  version: string;
}) {
  const { deps, pkg, version } = opts;
  pkg.dependencies ||= {};
  deps.forEach((dep) => {
    if (pkg?.dependencies?.[dep]) {
      pkg.dependencies[dep] = version;
    }
    if (pkg?.devDependencies?.[dep]) {
      pkg.devDependencies[dep] = version;
    }
  });
  return pkg;
}
