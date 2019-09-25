module.exports = {
  environment:'dev',
  database:{
    dbName:'fvcksql',
    user:'root',
    password:'admin123',
    host:'localhost',
    port:3306,
  },
  security:{
    secretKey:'aksjf023hfahfc',
    expiresIn:60*60*24*7
  }
}