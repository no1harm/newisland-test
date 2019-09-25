function isLoginType(type){
  for(let key in this){
    if(this[key] == type){
      return true
    }
  }
  return false
}
const LoginType = {
    USER_MINI_PROGRAM:100,
    USER_MAIL:101,
    USER_MOBILE:102,
    ADMIN_MAIL:200,
    isLoginType
}

module.exports = {
  LoginType
}