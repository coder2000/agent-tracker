const root = require("app-root-path").path;

module.exports = {
  entry: "./bin/www.ts",
  target: "node",
  externals: [/^[a-z\-0-9]+$/],
  node: {
    __dirname: false
  },
  output: {
    filename: "compiled", // output file
    path: `${root}/packages/server/build`,
    libraryTarget: "commonjs"
  },
  resolve: {
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modules: [`${root}/node_modules`, "node_modules"]
  },
  resolveLoader: {
    //root: [`${root}/node_modules`],
  },
  module: {
    rules: [
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
