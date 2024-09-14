# 背景
将babel-loader替换为esbuild-loader后，原来babel-plugin-import插件无法使用，致使在导入一些组件库，比如antd时无法自动按需导入组件和样式
只能在global.less中全量导入less文件。因此esbuild-loader-import就可以应对这种情况。
# 如何使用
## 1.安装
```
npm i esbuild-loader-import
yarn add esbuild-loader-import
pnpm i esbuild-loader-import
```

## 2.使用
```
webpack.config.js
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
```
- `libraryName`: 需要按需导入的库的名称
- `libraryDirectory`: 需要从库中的哪个文件夹进行导入
- `styles`: 是否需要将css也按需导入
## 效果
```
// 原始文件:
import { Button } from 'antd';
// 转化为：
import Button from 'antd/es/button'
import 'antd/es/button/style'
```



