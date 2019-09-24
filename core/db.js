const Sequelize = require('sequelize')
const {
  dbName,
  user,
  password,
  host,
  port
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
  dialect:'mysql',
  host,
  port,
  logging:true,
  timezone:'+08:00',
  define:{
    // 去除时间戳
    timestamps:true,
    paranoid:true,
    createdAt:'created_at',
    deletedAt:'deleted_at',
    updatedAt:'updated_at',
    underscored:true,
    freezeTableName:true
  }
})

// 使用 force 可以强制更新表
sequelize.sync({
  force:true,
})

module.exports = {
  sequelize
}