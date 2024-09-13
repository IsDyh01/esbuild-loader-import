# 背景
将babel-loader替换为esbuild-loader后，原来babel-plugin-import插件无法使用，致使在导入一些组件库，比如antd时无法自动按需导入组件和样式
只能在global.less中全量导入less文件。因此esbuild-loader-import就可以应对这种情况。
# 如何使用
## 1.安装
<div>npm i esbuild-loader-import</div>
<div>yarn add esbuild-loader-import</div>
<div>pnpm i esbuild-loader-import</div>

## 2.使用
<div>webpack.config.js</div>
module: {
    rules: [
        {
            test: /\.(js|mjs|jsx)$/,
            use: [
                {
                    loader: 'esbuild-loader',
                    options: {
                        target: 'es2015',
                        loader: 'jsx'
                    }
                },
                {
                    loader: 'esbuild-loader-import',
                    options: {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        styles: true,
                    }
                }
            ]
        }
    ]
}

<div>
  <div>libraryName: 需要按需导入的库的名称</div>
  <div>libraryDirectory: 需要从库中的哪个文件夹进行导入</div>
  <div>styles: 是否需要将css也按需导入</div>
</div>

## 效果
<div>原始文件中: import { Button } from 'antd';</div>
<div>转化为：</div>
<div>import Button from 'antd/es/button'</div>
<div>import 'antd/es/button/style'</div>



