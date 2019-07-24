'use strict'
const gitCommitInfo = require('child_process').execSync('/usr/local/git/bin/git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim();
//const gitCommitInfo = require('child_process').execSync('git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim();
process.env.RELEASE_VERSION = gitCommitInfo;
console.log(`${gitCommitInfo}`)
module.exports = {
  NODE_ENV: '"production"',
  RELEASE_VERSION: `${gitCommitInfo}`
}
