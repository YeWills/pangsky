import { copyFileSync, statSync } from 'fs';
import { dirname } from 'path';
import fsExtra from '../../compiled/fs-extra';
import prompts from '../../compiled/prompts';
import Generator from '../Generator/Generator';

interface IOpts {
  path: string;
  target: string;
  baseDir?: string;
  data?: any;
  handlePath?: any; //自定义修改文件、文件夹的路径
  questions?: prompts.PromptObject[];
}

export default class BaseGenerator extends Generator {
  path: string;
  target: string;
  handlePath: any; //自定义修改文件、文件夹的路径
  data: any;
  questions: prompts.PromptObject[];

  constructor({ path, target, data, questions, baseDir, handlePath }: IOpts) {
    super({ baseDir: baseDir || target, args: data });
    this.path = path;
    this.target = target;
    this.data = data;
    this.handlePath = handlePath;
    this.questions = questions || [];
  }

  prompting() {
    return this.questions;
  }

  async writing() {
    const context = {
      ...this.data,
      ...this.prompts,
      handlePath: this.handlePath,
    };
    if (statSync(this.path).isDirectory()) {
      this.copyDirectory({
        context,
        path: this.path,
        target: this.target,
      });
    } else {
      if (this.path.endsWith('.tpl')) {
        this.copyTpl({
          templatePath: this.path,
          target: this.target,
          context,
        });
      } else {
        const absTarget = this.target;
        fsExtra.mkdirpSync(dirname(absTarget));
        copyFileSync(this.path, absTarget);
      }
    }
  }
}
