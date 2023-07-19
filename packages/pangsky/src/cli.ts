import { chalk, isLocalDev, yParser } from '@pskyjs/utils';
import path, { join } from 'path';
import fs from 'fs-extra';
import {
  configValues,
  getConfigJsonPath,
  getTplListJsonPath,
  savePlaceMapPath,
} from './const';

const cliHanlder = () => {
  const args = yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    boolean: ['version'],
  });

  const cmd = process.cwd();

  if (args._[0] === 'update') {
    const projectConfigPath = join(
      cmd,
      configValues.projectConfigDir,
      configValues.projectConfigFileName,
    );
    const tplItem = fs.readJsonSync(projectConfigPath);
    savePlaceMapPath(tplItem, cmd);
    return;
  }

  if (args._[0] === 'config' && args._[1] === 'get') {
    const configJsonPath = getConfigJsonPath();
    if (configJsonPath) {
      const pskyConfig = fs.readJsonSync(configJsonPath);
      console.log(
        `${configValues.storeLocation} location = ${
          pskyConfig[configValues.storeLocation]
        }`,
      );
      console.log(
        `${configValues.pskyTplListJson} location = ${path.join(
          configJsonPath,
          configValues.pskyTplListJson,
        )}`,
      );
      return;
    }

    const pskyTplListJsonPath = getTplListJsonPath();
    console.log(
      `${configValues.pskyTplListJson} location = ${pskyTplListJsonPath}`,
    );
    return;
  }

  if (args._[0] === 'config' && args._[1] === 'set') {
    const configKey = args._[2];
    const configValue = args._[3];
    const configJsonPath = getConfigJsonPath();
    let pskyConfig: any = {};
    if (configJsonPath) {
      pskyConfig = fs.readJsonSync(configJsonPath);
    }

    pskyConfig[configKey] = configValue;
    const data = JSON.stringify(pskyConfig, null, 2);

    fs.writeFile(configJsonPath, data);

    console.log(`success!`);
    return;
  }

  if (args.version && !args._[0]) {
    args._[0] = 'version';
    const local = isLocalDev() ? chalk.cyan('@local') : '';
    const { name, version } = require('../package.json');
    console.log(`${name}@${version}${local}`);
  } else {
    require('./')
      .default({
        cwd: process.cwd(),
        args,
      })
      .catch((err: Error) => {
        console.error(`Create failed, ${err.message}`);
        console.error(err);
      });
  }
};

cliHanlder();
