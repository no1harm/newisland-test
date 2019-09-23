const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouter()
    InitManager.initLoadErrorSetting()
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
    const errors = require('./httpException')
    global.errors = errors
  }
}

module.exports = InitManager