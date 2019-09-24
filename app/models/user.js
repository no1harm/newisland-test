const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Users extends Model {

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
  email:Sequelize.STRING,
  password:Sequelize.STRING,
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