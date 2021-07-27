'use strict'

const fs = require('fs')

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.options = options

    this.commands = {
    }

    this.hooks = {
      'package:initialize': this.beforeBuild.bind(this),
      'package:finalize': this.afterBuild.bind(this),
    }
  }

  beforeBuild() {
    Object.keys(this.serverless.service.functions).forEach((k) => {
      const func = this.serverless.service.functions[k]
      if (func.embedded) {
        func.embedded.files.forEach((file) => {
          fs.copyFileSync(`${file}`, `${file}.org`)
          let result = fs.readFileSync(file, 'utf8')
          Object.keys(func.embedded.variables).forEach((k2) => {
            const val = func.embedded.variables[k2]
            result = result.replace(new RegExp('\\${process.env.'+k2+'}', 'g'), val)
            result = result.replace(new RegExp('process.env.'+k2, 'g'), `'${val}'`)
          })
          fs.writeFileSync(file, result, 'utf8')
        })
      }
    })
  }

  afterBuild() {
    Object.keys(this.serverless.service.functions).forEach((k) => {
      const func = this.serverless.service.functions[k]
      if (func.embedded) {
        func.embedded.files.forEach((file) => {
          fs.copyFileSync(`${file}.org`, file)
          fs.unlinkSync(`${file}.org`)
        })
      }
    })
  }
}

module.exports = ServerlessPlugin
