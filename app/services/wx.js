const axios = require('axios')
const util = require('util')
const { Users } = require('../models/user')
const { generateToken } = require('../../core/utils')
const { Auth } = require('../../middlewares/auth')

class WxManager {
  constructor(){
    
  }
  static async codeToToken(code){
    const { loginUrl,appId,appSecret } = global.config.wx
    const url = util.format(loginUrl,appId,appSecret,code)
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new global.errors.AuthFailed('openid 获取失败')
    }
    if(result.data.errcode !== 0){
      throw new global.errors.AuthFailed(`openid 获取失败 ${result.data.errcode}`)
    }
    let user = await Users.getUserByOpenId(result.data.openid)
    if(!user){
      user = await Users.registerByOpenId(openid)
    }
    const token = generateToken(user.id,Auth.USER)
    return token 
  }
}

module.exports = {
  WxManager
}