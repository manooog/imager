## 发布

### 使用

以 nodejs 为例

```js
import { githubUploader } from "@rxh/imager";

githubUploader.setConfig({
  repo: GH_REPO,
  token: GH_TOKEN,
  user: GH_USER,
});

let file = new File();

githubUploader.upload([file]);
```

### 开发

- 实时编译

```bash
yarn dev
```

- 本地调试

在 imager 根目录下执行

```bash
yarn link

```

然后在需要使用这个包的目录下执行

```bash
yarn link @rxh/imager
```

- 发布

```bash
npm publish --access=public
```
