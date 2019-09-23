class HttpException extends Error {
  constructor(msg="服务器错误",errorCode=10001,statusCode=400){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}

class ParamsException extends HttpException {
  constructor(msg,errorCode=10002,statusCode=400){
    super()
    this.msg = msg || "参数错误",
    this.errorCode = errorCode || 10002
    this.statusCode = statusCode || 400
  }
}

module.exports = { 
  HttpException,
  ParamsException
}