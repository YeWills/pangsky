import { chalk, isLocalDev, yParser, prompts, getGitInfo } from '@pskyjs/utils';
import path, { join } from 'path';
import 'zx/globals'; //注意要使用 4.3.0或以下版本，此版本编译后的源码，支持commonjs，高版本是esmodule，无法被 node 14 直接支持运行
import fs from 'fs-extra';
import {
  configValues,
  getStoreMainDir,
  getPlaceMapPath,
  getConfigJsonPath,
  setTplJson,
  getTplListJsonPath,
  savePlaceMapPath,
  creatProjectConfigFile,
  TplItemType,
} from './const';

const enCopyFile = (prePath: string, targetPath: string) => {
  if (fs.existsSync(prePath)) {
    fs.copyFileSync(prePath, targetPath);
  }
};

const cliHanlder = async () => {
  const args = yParser(process.argv.slice(2), {
    alias: {
      version: ['v'],
      help: ['h'],
    },
    boolean: ['version'],
  });

  const cmd = process.cwd();

  if (args._[0] === 'add') {
    const response: any = await prompts([
      {
        type: 'text',
        name: 'tplTitle',
        message: '请输入模版名',
      },
      {
        type: 'text',
        name: 'tplbranch',
        message: '请输入模版所在的branch',
        initial: undefined,
      },
      {
        type: 'text',
        name: 'tplpath',
        message: '请输入模版所在文件目录',
        initial: undefined,
      },
    ]);

    const { gitUrl } = await getGitInfo();

    const tplItem: TplItemType = {
      title: response.tplTitle,
      repository: gitUrl,
    };
    if (response.tplbranch) {
      tplItem.branch = response.tplbranch;
    }
    if (response.tplpath) {
      tplItem.path = response.tplpath;
    }

    // 模版信息保存到模版列表中
    setTplJson(tplItem);
    // 更新映射文件
    savePlaceMapPath(tplItem, cmd);
    // 创建项目下的psky目录
    creatProjectConfigFile(cmd, tplItem);
    return;
  }

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
    const pskyTplListJsonPath = getTplListJsonPath();
    if (configJsonPath) {
      const pskyConfig = fs.readJsonSync(configJsonPath);
      console.log(
        `${configValues.storeLocation} location = ${
          pskyConfig[configValues.storeLocation]
        }`,
      );
      console.log(
        `${configValues.pskyTplListJson} location = ${pskyTplListJsonPath}`,
      );
      return;
    }

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
    let validConfigJsonPath = '';
    if (configJsonPath) {
      validConfigJsonPath = configJsonPath;
      pskyConfig = fs.readJsonSync(configJsonPath);
    } else {
      const storeDir = getStoreMainDir();
      validConfigJsonPath = path.join(storeDir, configValues.pskyConfigJson);
    }

    pskyConfig[configKey] = configValue;

    const data = JSON.stringify(pskyConfig, null, 2);
    // 设置缓存位置时，将必要的文件复制到新的缓存位置上
    if (configKey === configValues.storeLocation) {
      const tpllistPath = getTplListJsonPath();
      const { filePath } = getPlaceMapPath();
      enCopyFile(
        tpllistPath,
        path.join(configValue, configValues.pskyTplListJson),
      );
      enCopyFile(
        filePath,
        path.join(configValue, configValues.projectAndUsePlaceMap),
      );
    }

    fs.writeFile(validConfigJsonPath, data);

    console.log(`success!`);
    return;
  }

  if (args._[0] === 'use') {
    const { filePath } = getPlaceMapPath();
    if (fs.existsSync(filePath)) {
      const placeMapJson = fs.readJsonSync(filePath);

      const promptsTplList = placeMapJson.datas.map((t: TplItemType) => ({
        title: t.title,
        value: t.insidetpl || t.title,
      }));

      const response: any = await prompts({
        type: 'select',
        name: 'appTemplate',
        message: 'Pick psk used tpl',
        choices: promptsTplList,
        initial: 0,
      });
      if (response.appTemplate) {
        // 迭代 response.appTemplate
        const selectItem = placeMapJson.datas.find(
          (t: any) =>
            t.insidetpl === response.appTemplate ||
            t.title === response.appTemplate,
        );
        console.log('选择的目录是：', selectItem.usePlacePath);
        $`code ${selectItem.usePlacePath}`;
      }
    }

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
