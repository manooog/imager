/**
 * @author: ruanbo
 * @description: Github 上传
 * @since: 2020.10.10
 * @see: https://docs.github.com/en/free-pro-team@latest/rest
 */
import { Octokit } from "@octokit/core";
import { praseUri } from "../util";
import Base from "./base";

const message = "update by github-file-save";
const ghFilePrefix = "https://raw.githubusercontent.com/:user/:repo/main/:path";

interface Config {
  token?: string;
  repo?: string;
  user?: string;
}
class GithubUploader extends Base {
  config: Config = {
    token: "",
    repo: "",
    user: "",
  };

  private octokit: Octokit;

  setConfig(config: Config) {
    this.config = Object.assign({}, this.config, config);
    this.octokit = new Octokit({ auth: this.config.token });
  }

  async upload(fileList: Array<File>) {
    const { user, repo } = this.config;
    return await Promise.all(
      fileList.map(async (file) => {
        const { b64, name } = await this.transformFile(file);
        try {
          const { data } = await this.octokit.request(
            "PUT /repos/:owner/:repo/contents/:path",
            {
              owner: user,
              repo,
              path: name,
              message,
              content: b64,
            }
          );
          return praseUri(ghFilePrefix, {
            user,
            repo,
            path: data.content.path,
          });
        } catch (error) {
          return "";
        }
      })
    );
  }
}

export default new GithubUploader();
