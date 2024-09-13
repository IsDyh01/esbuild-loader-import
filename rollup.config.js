const babel = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')


module.exports = {
  input: './main.js',
  output: {
    file: 'dist/lib/index.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    })
  ]
};
