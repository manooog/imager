import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const plugins = [
  typescript({
    tsconfig: "tsconfig.json",
    useTsconfigDeclarationDir: true,
  }),
  terser(),
];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "umd",
      name: "@rxh/imager",
      sourcemap: true,
    },
    { file: "dist/index.esm.js", format: "esm", sourcemap: true },
  ],
  plugins,
};
