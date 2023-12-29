const express=require('express');
const articleRouter=require("./routes/articles")
const methodOverride=require('method-override')
const mongoose=require("mongoose");
const Article=require("./models/article");
mongoose.connect('mongodb+srv://sanjaysenthilkumar04:Sanjay%402004@sanjaycluster.yhwaicm.mongodb.net/blog')
const app=express();
const port=3000;
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.get("/",async (req,res)=>{
    const articles=await Article.find().sort({dateAtCreated:'desc'});
    res.render("articles/index",{articles:articles});
})
app.use("/articles",articleRouter);
app.listen(port,()=>{
    console.log(`your server is listening on port ${port}`)
});