const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(level){
    this.level = level || 2
    Auth.USER = 8
    Auth.MANAGER = 16
  }
  get token(){
    return async (ctx,next)=>{
      // 这里获取的是 node.js 的请求，而不是 koa2 的请求(ctx.request)
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token 不合法'
      if(!userToken || !userToken.name){
        throw new global.errors.Forbidden(errMsg)
      }
      try {
        // jwt.verify() 会返回令牌的相关信息
        var decode = jwt.verify(userToken.name,global.config.security.secretKey)
      } catch (error) {
        if(error.name === "TokenExpiredError"){
          errMsg = 'token 已过期'
        }
        throw new global.errors.Forbidden(errMsg)
      }
      if(decode.scope <= this.level){
        errMsg = '权限不足'
        throw new global.errors.Forbidden(errMsg)
      }
      // 把相关令牌信息保存在 ctx 中，方便后续操作
      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }

      // 记得调用 next() 进入下一个中间件操作
      await next()
    }
  }
}

module.exports = {
  Auth
}