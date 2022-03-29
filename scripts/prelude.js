const yaml = require('js-yaml')
const fs = require('fs')
fs.writeFileSync('./docs/.vuepress/grammars/erb.tmlanguage.json', JSON.stringify(yaml.load(fs.readFileSync('./docs/.vuepress/grammars/erb.tmlanguage.yaml'))))