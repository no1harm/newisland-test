class HttpException extends Error {
  constructor(msg="服务器错误",errorCode=10001,statusCode=400){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}

class ParameterException extends HttpException {
  constructor(msg,errorCode=10002,statusCode=400){
    super()
    this.msg = msg || "参数错误",
    this.errorCode = errorCode || 10002
    this.statusCode = statusCode || 400
  }
}

class Success extends HttpException {
  constructor(msg,errorCode=0,statusCode=201){
    super()
    this.msg = msg || "ok",
    this.errorCode = errorCode,
    this.statusCode = statusCode
  }
}

class AuthFailed extends HttpException {
  constructor(msg,errorCode=10003,statusCode=404){
    super()
    this.msg = msg || "授权失败",
    this.errorCode = errorCode || 10002
    this.statusCode = statusCode || 404
  }
}

class Forbidden extends HttpException {
  constructor(msg,errorCode=10003,statusCode=403){
    super()
    this.msg = msg || "没有权限访问",
    this.errorCode = errorCode || 10002
    this.statusCode = statusCode || 403
  }
}


module.exports = { 
  HttpException,
  ParameterException,
  Success,
  AuthFailed,
  Forbidden
}