const { HttpException } = require('../core/httpException')

const catchError = async (ctx,next) => {
  try {
    await next()
  } catch (error) {
    // 已知异常
    if(error instanceof HttpException){
      ctx.body = {
        msg:error.msg,
        error_code:error.errorCode,
        code:error.statusCode,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = error.statusCode
    }else{
      // 未知异常
      ctx.body = {
        msg:"未知异常",
        error_code:999,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError