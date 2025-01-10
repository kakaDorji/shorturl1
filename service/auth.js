// const sessionToUserM ap=new Map();
const jwt=require('jsonwebtoken');
const secret="karma@1234";
//id
function setUser(user){
  // sessionToUserMap.set(id,user);
 
  return jwt.sign({
    _id:user._id, 
    email:user.email,
    role:user.role
  },secret);
}

function getUser(token){
//  return sessionToUserMap.get(id);
if(!token) return null;
try{
  return jwt.verify(token,secret);
}catch(err){
  return null;
} 
}

module.exports={
  setUser,getUser
}