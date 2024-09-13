const babel = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const jsonplugin = require('@rollup/plugin-json')


module.exports = {
  input: './main.js',
  output: {
    file: 'dist/lib/index.js',
      format: 'esm' // 有cjs 和 esm两种模式
  },
  plugins: [
    //   nodeResolve(), // 该插件是将文件中引入的第三方包也打包进dist中，rollup默认是不会将三方包打包的
      commonjs(), // 该插件是将commonjs模块转换为esm模块，再format为esm时且文件中有cjs语法时有用
      jsonplugin(),
      // babel转换插件
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    })
  ]
};
