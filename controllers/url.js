//old way or imprting and exporting i mean require whereas imprt in modern way of improting
const shortid = require('shortid');
const URL=require('../models/url');
async function handleGenerateNewShortURl(req,res){
  const body=req.body;

  if(!body.url)return res.status(400).json({error:"urls is required"});
  const shortId=shortid();
   await URL.create({
    shortId:shortId,
    redirectURL:req.body.url,
    visitHistory:[],
    createdBy:req.user._id,
   })
return res.render("home",{
  id:shortId
}
)

}
async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
 const result= await URL.findOne({shortId});
 return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory});
}

module.exports={
  handleGenerateNewShortURl,
  handleGetAnalytics
}