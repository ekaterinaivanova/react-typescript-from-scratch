const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/app.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|json)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    host: '0.0.0.0',
    compress: true,
    hot: true,
    port: 3000,
    publicPath: '/',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copy directory contents to {output}/to/directory/
        { from: 'extractedTranslations', to: 'translations' },
      ],
    }),
  ],
};
