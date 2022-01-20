#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
var figlet = require('figlet');

// 配置 create 命令
program
  .command('create <app-name>')
  .description('创建项目')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // console.log('name:',name,'options:',options)
    require('../lib/create.js')(name, options)
  })

// 配置 UI 信息
program
  .command('ui')
  .description('选择 UI ')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

// 配置版本信息
program.version(`V ${require('../package.json').version}`, '-v  --vers')

// 修改信息首行提示
program
  .name('maka-cli')
  .usage('<command> [option]')


// 自定义事件监听
program.on('--help', () => {
  // 使用 figlet 绘制 Logo
  console.log('\r\n' + figlet.textSync('maka-cli', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
  }));

  // 完善帮助信息，使用 chalk 优化颜色
  console.log(`\r\nRun ${chalk.cyan(`maka-cli <command> --help`)} for detailed usage of given command\r\n`)

})  


// 解析用户执行命令传入参数
program.parse(process.argv)  // process.argv => [ '/usr/local/bin/node', '/usr/local/bin/maka' ]
