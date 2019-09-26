const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcrypt')

class Users extends Model {
  static async verifyEmailPassword(email,plainPassword){
    const user = await Users.findOne({
      where:{
        email
      }
    })
    if(!user){
      throw new global.errors.AuthFailed('Email 账号不存在')
    }
    const correct = bcrypt.compareSync(plainPassword,user.password)
    if(!correct){
      throw new global.errors.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenId(openid){
    const user = await Users.findOne({
      where:{
        openid
      }
    })
    return user
  }

  static async registerByOpenId(openid){
    const user = await Users.create({
      openid
    })
    return user
  }
}

Users.init({
  // id 考虑性能最好为纯数字，同时考虑并发
  id:{
    // 类型 为字符串
    type:Sequelize.INTEGER,
    // 是否为主键
    primaryKey:true,
    // 是否自动增长
    autoIncrement:true
  },
  nickname:Sequelize.STRING,
  email:{
    type:Sequelize.STRING(128),
    unique:true
  },
  password:{
    type:Sequelize.STRING,
    set(val){
      // 位数 理论上数字越高，加密和破解成本就越高
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val,salt)
      this.setDataValue("password",pwd)  
    }
  },
  openid:{
    // 限制字符串长度
    type:Sequelize.STRING(64),
    // 是否为唯一
    unique:true
  },
},{
  sequelize,
  tableName:'User'
})

module.exports = {
  Users,
}