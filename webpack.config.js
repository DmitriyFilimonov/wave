const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {

  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      resolve: {
        extensions: ['.ts', '.tsx'],
      },
      use: {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
          allowTsInNodeModules: true,
        },
      }
    }]
  },
  plugins: [htmlPlugin]
};