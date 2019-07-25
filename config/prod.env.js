'use strict'
//第一个参数（区分old还是new）
const argv1 = process.argv[2];
// 因为本地和jenkins上面执行git命令的路径不同，做下判断
const gitCommitInfo = argv1 && process.env.NODE_ENV === 'production' ?  require('child_process').execSync('/usr/local/git/bin/git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim()
  : require('child_process').execSync('git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim()
process.env.RELEASE_VERSION = gitCommitInfo;
module.exports = {
  NODE_ENV: '"production"',
  RELEASE_VERSION: `${gitCommitInfo}`
}
