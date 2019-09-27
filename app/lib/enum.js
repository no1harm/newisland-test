function isLoginType(type){
  for(let key in this){
    if(this[key] == type){
      return true
    }
  }
  return false
}

function isArtType(type){
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
    isLoginType,
}

const ArtType = {
  movie:100,
  sentence:200,
  music:300,
  book:400,
  isArtType,
}

module.exports = {
  LoginType,
  ArtType
}