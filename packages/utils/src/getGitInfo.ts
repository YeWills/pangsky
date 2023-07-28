import * as execa from '../compiled/execa';

export interface IGitInfo {
  username: string;
  email: string;
  gitUrl: string;
}

const getGitInfo = async (): Promise<IGitInfo> => {
  try {
    const [{ stdout: username }, { stdout: email }, { stdout: gitUrl }] =
      await Promise.all([
        execa.execaCommand('git config --global user.name'),
        execa.execaCommand('git config --global user.email'),
        execa.execaCommand('git remote get-url --push origin'),
      ]);
    return { username, email, gitUrl };
  } catch (e) {
    return {
      username: '',
      email: '',
      gitUrl: '',
    };
  }
};

export default getGitInfo;
