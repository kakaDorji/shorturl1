const mongoose=require('mongoose');
require('dotenv').config();
async function connectMongoDB(){
  try{
await mongoose.connect(process.env.MONGODB_URI);
console.log("connect to mangodb");
  }
  catch(error){
    console.error("error connection to mongodb",error.message);
    process.exit(1);
  }
}

module.exports={
  connectMongoDB,
}