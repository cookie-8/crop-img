'use strict'
const pathConfig = require('./paths')
const fs = require('fs')

const file = fs.readFileSync(pathConfig.appPackageJson).toString(),
    projectName = JSON.parse(file).name

module.exports = {
    dev: ``,
    prod: ``,
    uat: ``,
}
