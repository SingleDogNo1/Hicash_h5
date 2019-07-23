'use strict'

require('child_process').exec('git fetch --tags', () => {
  const gitTag = require('child_process').execSync("echo -e $(git describe --tags `git rev-list --tags --max-count=1`)");
  console.log("gitTag===", gitTag)
});
let gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()
console.log("gitSha===", gitSha)
module.exports = {
  NODE_ENV: '"production"'
}
