const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op  } = require('sequelize')
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
      const { Art } = require('./art')      
      const art = await Art.getData(art_id,type)
      if(!art){
        throw new global.errors.NotFound()
      }
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
      const { Art } = require('./art')
      const art = await Art.getData(art_id,type)
      await art.decrement('fav_nums',{by:1,transaction:t})
    })
  }

  static async userLikeStatus(uid,art_id,type){
    const favor = await Favor.findOne({
      where:{
        art_id,
        type,
        uid
      }
    })
    if(!favor){
      return false
    }
    return true
  }

  static async getUserAllFavors(uid){
    const favors = await Favor.findAll({
      where:{
        uid,
        type:{
          [Op.not]:400
        }
      }
    })
    if(!favors){
      throw new global.errors.NotFound()
    }
    const { Art } = require('./art')
    return await Art.handleUserFavorsList(favors)
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