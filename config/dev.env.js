'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let gitCommitInfo = require('child_process').execSync('git log -p -1 --pretty=format:"%s"').toString().split("diff --git")[0].trim()
console.log("gitCommitInfo===", gitCommitInfo)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RELEASE_VERSION: `"${gitCommitInfo}"`
})
