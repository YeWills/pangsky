import {
  getStoreMainDir,
  getTplListJsonPath,
  getLocalStoreDir,
  readTplListJsonFile,
} from './const';
import fs, { existsSync, mkdirSync } from 'fs-extra';

const installEvent = async () => {
  const pskyTplListJsonPath = getTplListJsonPath();

  const exsitsTplList = readTplListJsonFile(pskyTplListJsonPath);
  const tplListJson = {
    tplList: [...exsitsTplList],
  };
  const data = JSON.stringify(tplListJson, null, 2);

  const localStoreDir = getLocalStoreDir();

  // 初始化默认配置目录或设置tplListJson

  if (localStoreDir) {
    return fs.writeFile(pskyTplListJsonPath, data);
  } else {
    // 如果没有自定义本地配置目录，就用默认目录
    const storeDir = getStoreMainDir();
    if (!existsSync(storeDir)) {
      mkdirSync(storeDir);
    }
    return fs.writeFile(pskyTplListJsonPath, data);
  }
};

installEvent();
