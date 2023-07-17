import {
  BaseGenerator,
  execa,
  fsExtra,
  getGitInfo,
  installWithNpmClient,
  logger,
  NpmClient,
  pkgUp,
  prompts,
  tryPaths,
  yParser,
} from '@pskyjs/utils';
import gitClone from 'git-clone';
import ora from 'ora';
import chalk from 'chalk';
import { existsSync } from 'fs';
import path, { dirname, join } from 'path';

const testData = {
  name: 'psky-plugin-demo',
  description: 'nothing',
  mail: 'xiaohuoni@gmail.com',
  author: 'xiaohuoni',
  org: 'pangskyjs',
  version: require('../package').version,
  npmClient: 'pnpm',
  registry: 'https://registry.npmjs.org/',
};

const setProjectName = ({ author }: any, targetDir: string) => {
  return new Promise((resolve, reject) => {
    const projectName = 'projectName';
    try {
      const pkgPath = path.resolve(targetDir, 'package.json');
      let pkg: any = fsExtra.readFileSync(pkgPath);
      pkg = JSON.parse(pkg);
      pkg.name = projectName;
      pkg.author = author;
      fsExtra.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      // if (template === "ssr") {
      //   const pm2Path = path.resolve(targetDir, "pm2.json");
      //   let content : any = fsExtra.readFileSync(pm2Path);
      //   content = content
      //     .toString()
      //     .replace('"name": ""', `"name": "${projectName}"`);
      //     fsExtra.writeFileSync(pm2Path, content);
      // }
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

interface IArgs extends yParser.Arguments {
  default?: boolean;
  plugin?: boolean;
  git?: boolean;
  install?: boolean;
}

interface IContext {
  projectRoot: string;
  inMonorepo: boolean;
  target: string;
}

interface ITemplateParams {
  version: string;
  npmClient: NpmClient;
  registry: string;
  author: string;
  withHusky: boolean;
  extraNpmrc: string;
}

export default async ({ cwd, args }: { cwd: string; args: IArgs }) => {
  const [name] = args._;
  let npmClient = 'pnpm' as NpmClient;
  let registry = 'https://registry.npmjs.org/';
  let appTemplate = 'app';
  const { username, email } = await getGitInfo();
  let author = email && username ? `${username} <${email}>` : '';

  // test ignore prompts
  if (!args.default) {
    const response = await prompts(
      [
        {
          type: 'select',
          name: 'appTemplate',
          message: 'Pick psk App Template',
          choices: [
            {
              title: '简单的react项目示例 react、ts、scss',
              value: 'react-simple',
            },
            {
              title: 'ts monorepo工具库，基于pnpm lerna turbo',
              value: 'monorepo-ts-cli',
            },
            {
              title: 'react typescript webpack ui 组件库',
              value: 'react-ts-webpack-ui',
            },
            { title: 'Simple App', value: 'app' },
            { title: 'Ant Design Pro', value: 'max' },
            { title: 'Vue Simple App', value: 'vue-app' },
          ],
          initial: 0,
        },
        {
          type: 'select',
          name: 'npmClient',
          message: 'Pick Npm Client',
          choices: [
            { title: 'npm', value: 'npm' },
            { title: 'cnpm', value: 'cnpm' },
            { title: 'tnpm', value: 'tnpm' },
            { title: 'yarn', value: 'yarn' },
            { title: 'pnpm', value: 'pnpm' },
          ],
          initial: 4,
        },
        {
          type: 'select',
          name: 'registry',
          message: 'Pick Npm Registry',
          choices: [
            {
              title: 'npm',
              value: 'https://registry.npmjs.org/',
              selected: true,
            },
            { title: 'taobao', value: 'https://registry.npmmirror.com' },
          ],
        },
      ],
      {
        onCancel() {
          process.exit(1);
        },
      },
    );
    npmClient = response.npmClient;
    registry = response.registry;
    appTemplate = response.appTemplate;
  }

  const pluginPrompts = [
    {
      name: 'name',
      type: 'text',
      message: `What's the plugin name?`,
      default: name,
    },
    {
      name: 'description',
      type: 'text',
      message: `What's your plugin used for?`,
    },
    {
      name: 'mail',
      type: 'text',
      message: `What's your email?`,
    },
    {
      name: 'author',
      type: 'text',
      message: `What's your name?`,
    },
    {
      name: 'org',
      type: 'text',
      message: `Which organization is your plugin stored under github?`,
    },
  ] as prompts.PromptObject[];

  const target = name ? join(cwd, name) : cwd;
  const templateName = args.plugin ? 'plugin' : appTemplate;

  const version = require('../package').version;

  // detect monorepo
  const monorepoRoot = await detectMonorepoRoot({ target });
  const inMonorepo = !!monorepoRoot;
  const projectRoot = inMonorepo ? monorepoRoot : target;

  // git
  const shouldInitGit = args.git !== false;
  // now husky is not supported in monorepo
  const withHusky = shouldInitGit && !inMonorepo;

  if (appTemplate === 'react-simple') {
    const spinner = ora(`Creating project ${chalk.yellow(appTemplate)}.\n`);
    spinner.start();

    const url = 'https://gitee.com/mayising/psky-template.git';
    gitClone(url, name, {}, async (err: string) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red('\nClone template failed'));
        console.log('\n', err);
        return;
        // reject(err);
      } else {
        const cwd = process.cwd();
        try {
          setProjectName({ author }, target);

          //  console.log(chalk.yellow("\nInstalling dependencies...\n"));
          // //  await install(pm, targetDir);
          //  console.log(
          //    `\n👉  Get started with the following com·`);

          // fs.moveSync(
          //   path.resolve(cwd, `${name}/${dir[template]}`),
          //   path.resolve(cwd, `${name}__temp`),
          //   { overwrite: true }
          // );
          // fs.moveSync(
          //   path.resolve(cwd, `${name}__temp`),
          //   path.resolve(cwd, name),
          //   { overwrite: true }
          // );
          // spinner.stop();
          // console.log(
          //   chalk.green(
          //     `\n🎉  Successfully created project ${chalk.yellow(name)}.`
          //   )
          // );
          // resolve();
        } catch (e) {
          // console.log(chalk.red(`\nCreated project ${name} failed.`));
          // fs.remove(path.resolve(cwd, name));
          // reject(err);
        }
      }
    });

    return;
  }

  const generator = new BaseGenerator({
    path: join(__dirname, '..', 'templates', templateName),
    target,
    data: args.default
      ? testData
      : ({
          version: version.includes('-canary.') ? version : `^${version}`,
          npmClient,
          registry,
          author,
          withHusky,
          // suppress pnpm v7 warning
          extraNpmrc:
            npmClient === 'pnpm' ? `strict-peer-dependencies=false` : '',
        } as ITemplateParams),
    questions: args.default ? [] : args.plugin ? pluginPrompts : [],
  });
  await generator.run();

  const context: IContext = {
    inMonorepo,
    target,
    projectRoot,
  };

  if (!withHusky) {
    await removeHusky(context);
  }

  if (inMonorepo) {
    // monorepo should move .npmrc to root
    await moveNpmrc(context);
  }

  // init git
  if (shouldInitGit) {
    await initGit(context);
  } else {
    logger.info(`Skip Git init`);
  }

  // install deps
  if (!args.default && args.install !== false) {
    installWithNpmClient({ npmClient, cwd: target });
  } else {
    logger.info(`Skip install deps`);
  }
};

async function detectMonorepoRoot(opts: {
  target: string;
}): Promise<string | null> {
  const { target } = opts;
  const rootPkg = await pkgUp.pkgUp({ cwd: dirname(target) });
  if (!rootPkg) {
    return null;
  }
  const rootDir = dirname(rootPkg);
  if (
    tryPaths([
      join(rootDir, 'lerna.json'),
      join(rootDir, 'pnpm-workspace.yaml'),
    ])
  ) {
    return rootDir;
  }
  return null;
}

async function moveNpmrc(opts: IContext) {
  const { target, projectRoot } = opts;
  const sourceNpmrc = join(target, './.npmrc');
  const targetNpmrc = join(projectRoot, './.npmrc');
  if (!existsSync(targetNpmrc)) {
    await fsExtra.copyFile(sourceNpmrc, targetNpmrc);
  }
  await fsExtra.remove(sourceNpmrc);
}

async function initGit(opts: IContext) {
  const { projectRoot } = opts;
  const isGit = existsSync(join(projectRoot, '.git'));
  if (isGit) return;
  try {
    await execa.execa('git', ['init'], { cwd: projectRoot });
    logger.ready(`Git initialized successfully`);
  } catch {
    logger.error(`Initial the git repo failed`);
  }
}

async function removeHusky(opts: IContext) {
  const dir = join(opts.target, './.husky');
  if (existsSync(dir)) {
    await fsExtra.remove(dir);
  }
}
