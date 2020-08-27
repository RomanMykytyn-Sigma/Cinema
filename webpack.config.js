const path = require('path');

module.exports = {
  entry: './client/src/App.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            }
         }
        ],
        include: path.resolve(__dirname, 'client/src'),
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
};