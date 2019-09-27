const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')
class Favor extends Model {
  static async like(uid,art_id,type){
    const favor = await Favor.findOne({
      where:{
        art_id,
        type,
        uid,
      }
    })
    if(favor){
      throw new global.errors.LikeError('已经点过赞了')
    }
    return sequelize.transaction(async t =>{
      await Favor.create({
        art_id,
        uid,
        type
      },{transaction:t})
      
      const art = await Art.getData(art_id,type)
      await art.increment('fav_nums',{by:1,transaction:t})
    })
  }

  static async disLike(uid,art_id,type){
    const favor = await Favor.findOne({
      where:{
        art_id,
        type,
        uid,
      }
    })
    if(!favor){
      throw new global.errors.DisLikeError()
    }
    return sequelize.transaction(async t => {
      await favor.destroy({
        // 强制删除
        force:true,
        transaction:t
      })
      const art = await Art.getData(art_id,type)
      await art.decrement('fav_nums',{by:1,transaction:t})
    })
  }
}

Favor.init({
  uid:Sequelize.INTEGER,
  art_id:Sequelize.INTEGER,
  type:Sequelize.INTEGER,
},{
  sequelize,
  tableName:'Favor'
})

module.exports = {
  Favor
}