const ora = require('ora')
const inquirer = require('inquirer')
const { getRepoList, getTagList } = require('./http')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo')
const { loadFont } = require('figlet')


// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}


class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async getRepoList() {
    // 1  从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;
    const repos = repoList.data.map(item => item.name);

    // 2  用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // 3 返回用户选择的名称
    return repo;
  }


  async getTagList (repo) {
     // 1 基于 repo 结果，远程拉取对应的 tag 列表
     const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
     if (!tags) return;
     const tagsList = tags.data.map(item => item.name);
 
     // 2 用户选择自己需要下载的 tag
     const { tag } = await inquirer.prompt({
       name: 'tag',
       type: 'list',
       choices: tagsList,
       message: 'Place choose a tag to create project'
     })
 
     // 3 返回用户选择的 tag
     return tag
  }

  async download (repo, tag) {
    // 1 拼接下载地址
    const requestUrl = `liyinfeng25/${repo}${tag?'#'+tag:''}`;

    // console.log('requestUrl  ====>', requestUrl);

    // 2 调用下载方法
    await wrapLoading(
      this.downloadGitRepo,
      'waiting download template',
      requestUrl, 
      path.resolve(process.cwd(), this.targetDir)
    ) 
  }

  // 核心创建逻辑
  async create(){
    // 1 获取模板名称
    const repo = await this.getRepoList()
    // 2 获取模板版本
    const tag = await this.getTagList(repo)
    // 3 下载模板
    await this.download(repo, tag)
    
    // console.log('用户选择了，repo=' + repo, 'tag=' + tag)
  }
}

module.exports = Generator;
