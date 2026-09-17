const yaml = require('js-yaml')
const fs = require('fs')
fs.writeFileSync('./docs/.vuepress/grammars/erb.tmlanguage.json', JSON.stringify(yaml.load(fs.readFileSync('./docs/.vuepress/grammars/erb.tmlanguage.yaml'))))

// 生成命令索引数据（供 <CommandIndex /> 使用），保证与 translation/Command.md 同步
require('./gen-command-index')

// 生成错误信息索引数据（供 <ErrorIndex /> 使用），从只读参考工程提取
require('./gen-error-index')
