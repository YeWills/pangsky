import path from 'path';
import { configValues, getStoreMainDir, readTplListJsonFile } from './const';
import fs, { existsSync, mkdirSync } from 'fs-extra';

const installEvent = async () => {
  const storeDir = getStoreMainDir();
  const installationFilePath = path.join(
    storeDir,
    configValues.pskyTplListJson,
  );
  const exsitsTplList = readTplListJsonFile();
  const tplListJson = {
    tplList: [...exsitsTplList],
  };
  const data = JSON.stringify(tplListJson, null, 2);
  if (!existsSync(storeDir)) {
    mkdirSync(storeDir);
  }
  return fs.writeFile(installationFilePath, data);
};

installEvent();
