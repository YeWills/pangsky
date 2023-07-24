import path, { join } from 'path';
import fs from 'fs-extra';
import { homedir } from 'os';
const userHome = homedir();

export const configValues = {
  myNameIs: 'psky',
  myNameIsCapitalized: 'Psky',
  pskyPackagesFolder: '.psky',
  projectConfigFileName: 'config.json', //跟随项目，用于定位映射信息
  projectConfigDir: '.psky', //跟随项目，用于定位映射信息
  pskyTplListJson: 'tplList.json',
  // 通过psky创建的项目，在本机中使用的位置映射
  projectAndUsePlaceMap: 'projectAndUsePlaceMap.json',
  pskyConfigJson: 'config.json',
  storeLocation: 'store', //自定义存储信息位置
};

// 用于内部、外部模版，以及 位置映射要素
export interface TplItemType {
  title: string;
  repository?: string; //外部模版 git地址
  insidetpl?: string; //内部模版
  path?: string; //外部模版 对应的仓库路径
  branch?: string; //外部模版在仓库中的 git branch
  usePlacePath?: string; //模版被创建到本地时，本地地址
}

// 创建项目配置目录
export function creatProjectConfigFile(
  targetPath: string,
  tplInfo: TplItemType,
) {
  fs.mkdirSync(join(targetPath, configValues.projectConfigDir));
  const str = JSON.stringify(tplInfo, null, 2);
  fs.writeFile(
    join(
      targetPath,
      configValues.projectConfigDir,
      configValues.projectConfigFileName,
    ),
    str,
  );
}

// 配置目录
export function getStoreMainDir(): string {
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return join(process.env.LOCALAPPDATA, configValues.myNameIsCapitalized);
  }
  return join(userHome, '.' + configValues.myNameIs);
}
// 自定义本地配置目录，主要存储业务相关的配置
export function getLocalStoreDir(): string {
  const storeDir = getStoreMainDir();
  const configJsonPath = path.join(storeDir, configValues.pskyConfigJson);

  if (fs.existsSync(configJsonPath)) {
    const pskyConfig = fs.readJsonSync(configJsonPath);
    if (pskyConfig[configValues.storeLocation]) {
      return pskyConfig[configValues.storeLocation];
    }
  }
  return '';
}

// tplListJson 文件位置
export function getTplListJsonPath(): string {
  const localDir = getLocalStoreDir();
  // 如果有自定义配置目录
  if (localDir) {
    return path.join(localDir, configValues.pskyTplListJson);
  }
  // 如果没有自定义配置目录，说明在cli的默认配置目录下
  const storeDir = getStoreMainDir();
  return path.join(storeDir, configValues.pskyTplListJson);
}

// 配置文件，配置文件只存在于默认的配置目录下，也可能没有;
// 没有自定义配置下，是不会有配置文件的
export function getConfigJsonPath(): string {
  const storeDir = getStoreMainDir();
  const configpath = path.join(storeDir, configValues.pskyConfigJson);
  if (fs.existsSync(configpath)) {
    return configpath;
  }
  return '';
}

interface MapType {
  filePath: string;
  // isCustomStore:boolean;
  parentPath: string; //判断父级目录是否存在，若不存在，则创建
}

// 位置映射 文件位置
export function getPlaceMapPath(): MapType {
  const localDir = getLocalStoreDir();
  // 如果有自定义配置目录
  if (localDir) {
    return {
      filePath: path.join(localDir, configValues.projectAndUsePlaceMap),
      // isCustomStore:true,
      parentPath: localDir,
    };
  }
  // 如果没有自定义配置目录，说明在cli的默认配置目录下
  const storeDir = getStoreMainDir();
  return {
    filePath: path.join(storeDir, configValues.projectAndUsePlaceMap),
    // isCustomStore:false,
    parentPath: storeDir,
  };
}

// 将项目安装目录信息同步到映射文件上
export function savePlaceMapPath(tplInfo: any, usePlacePath: string) {
  const { filePath, parentPath } = getPlaceMapPath();
  const tplInfoWithPlace = { ...tplInfo, usePlacePath };
  let placeMapJson: any = {};
  if (fs.existsSync(filePath)) {
    placeMapJson = fs.readJsonSync(filePath);
    if (!placeMapJson.datas) {
      placeMapJson.datas = [];
    }
    const existItemIdx = placeMapJson.datas.findIndex((item: any) => {
      if (
        item.branch === tplInfo.branch &&
        item.repository === tplInfo.repository &&
        item.path === tplInfo.path
      ) {
        return true;
      }
      return false;
    });

    if (existItemIdx === -1) {
      placeMapJson.datas = [...placeMapJson.datas, tplInfoWithPlace];
    } else {
      placeMapJson.datas[existItemIdx] = tplInfoWithPlace;
    }
  } else {
    placeMapJson = {
      datas: [tplInfoWithPlace],
    };
  }

  placeMapJson = JSON.stringify(placeMapJson, null, 2);
  if (!fs.existsSync(parentPath)) {
    fs.mkdirSync(parentPath);
  }

  fs.writeFile(filePath, placeMapJson);
}

export const originTemplateList = [
  {
    title: '简单的react项目示例 react、ts、scss',
    repository: 'https://gitee.com/mayising/psky-template.git',
    path: 'react-simple', //默认是整个根目录
  },
];

export const readTplListJsonFile = (pskyTplListJsonPath: string) => {
  let pskyTplList;

  try {
    fs.accessSync(pskyTplListJsonPath);
    try {
      const pskyTplJson = fs.readJsonSync(pskyTplListJsonPath);
      pskyTplList = pskyTplJson.tplList;
    } catch (e) {
      console.error(
        `Error reading ${configValues.pskyTplListJson} file`,
        pskyTplListJsonPath,
        e,
      );
      pskyTplList = [];
    }
  } catch (e) {
    pskyTplList = [];
  }

  return pskyTplList;
};

export const templateList = [
  ...readTplListJsonFile(getTplListJsonPath()),
  ...originTemplateList,
];
