import path from 'path';
import fs from 'fs-extra';
import { homedir } from 'os';
import { join } from 'path';
const userHome = homedir();

export const configValues = {
  myNameIs: 'psky',
  myNameIsCapitalized: 'Psky',
  pskyPackagesFolder: '.psky',
  pskyTplListJson: 'tplList.json',
};

export function getStoreMainDir(): string {
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return join(process.env.LOCALAPPDATA, configValues.myNameIsCapitalized);
  }
  return join(userHome, '.' + configValues.myNameIs);
}

export const originTemplateList = [
  {
    title: '简单的react项目示例 react、ts、scss',
    repository: 'https://gitee.com/mayising/psky-template.git',
    path: 'react-simple', //默认是整个根目录
  },
];

export const readTplListJsonFile = () => {
  const storeDir = getStoreMainDir();
  const pskyTplListJsonPath = path.join(storeDir, configValues.pskyTplListJson);
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

export const templateList = [...readTplListJsonFile(), ...originTemplateList];
