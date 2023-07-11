import { yParser } from '@pskyjs/utils';

interface IArgs extends yParser.Arguments {
  default?: boolean;
  plugin?: boolean;
  git?: boolean;
  install?: boolean;
}

export default async ({ cwd, args }: { cwd: string; args: IArgs }) => {
  console.log(cwd, args);
};
