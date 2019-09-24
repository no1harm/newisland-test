const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouter()
    InitManager.initLoadErrorSetting()
    // InitManager.initValidator()
    InitManager.initEnvironmentSetting()
  }

  static initLoadRouter(){

    const Url = `${process.cwd()}/app/api`

    requireDirectory(module, Url , {visit:whenModuleLoad})

    function whenModuleLoad (obj) {
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }

  static initLoadErrorSetting(){
    const errors = require('./http-exception')
    global.errors = errors
  }

  // static initValidator(){
  //   const validators = require('../app/validators/validator')
  //   global.validators = validators
  // }

  static initEnvironmentSetting(){
    const Url = `${process.cwd()}/config/config`
    const config = require(Url)
    global.config = config
  }
}

module.exports = InitManager