const path = require('path')
require('dotenv').config({path:"./.env"});
const InitiateMongoServer = require(path.join(__dirname,"/src/config/connectDB"));


async function start(){
  try{
    await InitiateMongoServer.sync()
  }catch(err){
    console.log(`service batabase error : ${err}`)
  }
  const app = require('./apprun');
  app.listen({  port : process.env.PORT || 3000}, function (err) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log(`listening on port ${ process.env.PORT }`)
  })
}

start()