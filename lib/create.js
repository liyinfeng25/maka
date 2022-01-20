const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')


module.exports = async function (name, options) {

  const cwd = process.cwd()
  const targetDir = path.join(cwd, name)

  if (fs.existsSync(targetDir)) {
    // 使用 ➜ maka create -f mm  { force: true }， 当目录存在时，强制创建
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 确认是否覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'OverWrite',
              value: true
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) { return }
      else {
        await fs.remove(targetDir)
      }
    }
  }

  const generator = new Generator(name, targetDir);

  generator.create()

  // console.log('==>', name, options);
}