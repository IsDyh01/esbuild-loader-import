const path = require('path');

module.exports = [
  {
        // CommonJS
        entry: './main.js',
      mode: 'development',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/lib'),
      libraryTarget: 'commonjs'
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
      entry: './main.js',
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
