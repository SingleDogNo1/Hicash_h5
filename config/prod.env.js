'use strict'

// require('child_process').exec('git fetch --tags', () => {
//   const gitTag = require('child_process').execSync("echo -e $(git describe --tags `git rev-list --tags --max-count=1`)").toString().trim();
//   console.log("gitTag===", gitTag)
// });
// var a = "git describe --tags $(git rev-list --tags --max-count=1)";
// var b = "git describe --tags `git rev-list --tags --max-count=1`";
// const gitTag = require('child_process').execSync(a).toString().trim();
// console.log("gitTag===", gitTag)
const config = require("./src/config.json");
console.log("config==", config)
let gitCommitInfo = require('child_process').execSync('/usr/local/git/bin/git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim()
//let gitCommitInfo = require('child_process').execSync('git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim()
module.exports = {
  NODE_ENV: '"production"',
  RELEASE_VERSION: `"${gitCommitInfo}"`
}
