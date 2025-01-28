const express=require("express");
const urlRoute=require("./routes/url");
const userRoute=require('./routes/user');
const staticRoute=require("./routes/staticRouter");
const{connectMongoDB}=require('./connect');
const URL=require("./models/url");
const path=require("path");
const cookieParser=require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");
const cors = require('cors');


const app=express();
const Port=8000;

//view engine
app.set('view engine','ejs');
//telling where to find view
app.set('views',path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(cors());


//route
app.use('/user',restrictTo(["NORMAL"]),userRoute);
app.use('/',staticRoute);
app.use("/url",restrictTo,urlRoute);
app.get("/:shortId",async(req,res)=>{
  const shortId=req.params.shortId;
  const entry=await URL.findOneAndUpdate({
  shortId
  },
  {
    $push:{
      visitHistory:{
        timestamp:Date.now(),
      }
    },
  }
);
if(!entry){
  return ; 
}
res.redirect(entry.redirectURL);

})
//database connection 
connectMongoDB();

app.listen(Port,()=>{
console.log("app running on port 8000");
})

