import { resolve } from "node:path";
import webpack from "webpack";

const compiler = webpack({
  devtool: false,
  mode: "production",
  entry: "./src/index.mjs",
  cache: true,
  output: {
    clean: {
      dry: true,
    },
    path: resolve(process.cwd(), "./lib/config"),
    filename: "index.cjs",
    library: {
      type: "umd2",
    },
  },
  target: "node",
  resolve: {
    cache: true,
    alias: {
      "postcss-styled-syntax/lib/parser.ts": resolve(
        process.cwd(),
        "node_modules/postcss-styled-syntax/lib/parser.js"
      ),
      "postcss-styled-syntax/lib/parseJs.ts": resolve(
        process.cwd(),
        "node_modules/postcss-styled-syntax/lib/parseJs.js"
      ),
    },
    modules: [
      resolve(process.cwd(), "./node_modules"),
      resolve(process.cwd(), "./node_modules/.pnpm/node_modules"),
    ],
  },
  externals: [],
  module: {
    rules: [
      {
        test: /\.(c|m|)js$/,
        use: {
          loader: resolve(process.cwd(), "./json-inline-loader.cjs"),
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  stats.compilation.warnings.forEach((v) => {
    console.warn(v.message);
  });
  stats.compilation.errors.forEach((v) => {
    console.error(v.message);
  });
});
