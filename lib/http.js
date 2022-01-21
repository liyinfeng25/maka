// 通过 axios 处理请求
const axios = require('axios')

/**
 * 获取模板列表
 */
 async function getRepoList() {
  return axios.get('https://api.github.com/users/liyinfeng25/repos')
}

/**
 * 获取版本信息
 */
 async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/liyinfeng25/${repo}/tags`)
}


module.exports = {
  getRepoList,
  getTagList
}