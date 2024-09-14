const path = require('path');

module.exports = [
  {
        // CommonJS
        entry: './main.js',
      mode: 'development',
    output: {
      filename: 'index.js',
        path: path.resolve(__dirname, 'dist/lib'),
    //   library: 'aaa',
        // libraryTarget: 'commonjs' // commonjs需要搭配library使用，打包后是exports[library]=_entry_point_return格式 
      libraryTarget: 'commonjs2' // commonjs2打包后是module.exports=_entry_point_return格式
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  {
    // ES Module
      entry: './main.mjs',
      mode: 'development',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/es'),
      libraryTarget: 'module',
      environment: {
        module: true
      }
    },
    experiments: {
      outputModule: true
    },
      module: {

      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
];