#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

console.log('maka working~')

const inquirer = require('inquirer')
const ejs = require('ejs')
const path = require('path')
const fs = require = require('fs')

const promptList = [{
  type: 'input',
  name: 'name',
  message: 'enter your name',
  defeult: 'default name'
}]

inquirer.prompt(promptList).then(answer => {
  //answer:  { name: 'ccc' }
  
  // 模板目录 template
  const templateDir = path.join(__dirname, 'template');
  // process.cwd() 返回当前工作目录、__dirname返回源代码所在的目录
  // 生成文件目录
  const cwdDir = process.cwd();
  
  // 读取模板目录的文件
  fs.readdir(templateDir, (err, files) => {
    if (err) throw err;
    // files: [ 'index.css', 'index.html' ]
    files.forEach(file => {
      // 使用 ejs 渲染对应的模版文件, 用法：ejs.renderFile（模版文件地址，传入渲染数据）
      ejs.renderFile(path.join(templateDir, file), answer).then(data => {
        // 生成 ejs 处理后的模版文件
        fs.writeFileSync(path.join(cwdDir, file) , data)
      })
    })
  })
})