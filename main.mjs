// const parser = require('@babel/parser');
// const generator = require('@babel/generator').default;
// const traverse = require('@babel/traverse').default;
// const types = require('@babel/types');
import parser from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import types from '@babel/types'
function camelToKebab(camelCaseString) {
    return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function esbuildLoaderImport(source) {
    const options = this.getOptions();

    const { libraryName, libraryDirectory, styles } = options;

    const ast = parser.parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
    })

    traverse(ast, {
        ImportDeclaration(path) {
                const node = path.node;
                if (node.source.value === libraryName) {

                    const specifiers = node.specifiers;
                    const newImport = [];
                    specifiers.forEach(specifier => {
                        let componentName = camelToKebab(specifier.local.name);
                        newImport.push(types.importDeclaration(
                            [types.importDefaultSpecifier(specifier.local)],
                            types.stringLiteral(`${libraryName}/${libraryDirectory}/${componentName}`)
                        ));
                        if (styles) {
                            // styles为true说明需要同时对样式文件做按需导入，则需要手动导入样式文件
                            newImport.push(types.importDeclaration(
                                [],
                                types.stringLiteral(`${libraryName}/${libraryDirectory}/${componentName}/style`)
                            ));
                        }
                    });
                    // 替换匹配到的import { ×× } from 'libraryName'语句，改为按需导入
                    path.replaceWithMultiple(newImport);

                }
            },
    })

    const { code } = generator(ast)

    return code;
}

export default esbuildLoaderImport;
