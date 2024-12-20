import { resolve } from "node:path";
import webpack from "webpack";

const compiler = webpack({
  devtool: false,
  mode: "production",
  entry: {
    stylelint: './src/stylelint.mjs',
    index: './src/index.mjs'
  },
  cache: true,
  output: {
    clean: true,
    path: resolve(process.cwd(), "./lib"),
    filename: (pathData) => {
      if (pathData.chunk.name === 'stylelint' || pathData.chunk.name === 'index') {
        return '[name].cjs';
      }
      return 'common/[name].cjs';
    },
    chunkFilename: 'common/[name].cjs',
    library: {
      type: 'umd2',
      export: 'default'
    },
    globalObject: 'this'
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
    splitChunks: {
      chunks: 'all',
    },
    concatenateModules: true,
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
