#! /usr/bin/env node

console.log('start')

const program = require('commander')

// 定义命令和参数
program
  .command('create <app-name>')
  .description('创建项目名11')
  .option('-f, --force', 'overwrite target directory if it exist')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .action((name, options) => {
    console.log('name:',name,'options:',options)
  })

// 配置版本信息
program
  .version(`V ${require('../package.json').version}`)
  .usage('<command> [option]')


program.parse(process.argv)