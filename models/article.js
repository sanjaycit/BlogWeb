const mongoose=require("mongoose");
const {marked}=require("marked");
const slugify=require("slugify");
const cerateDomPurify=require('dompurify')
const {JSDOM}=require('jsdom');
const dompurify=cerateDomPurify(new JSDOM().window)
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    markdown:{
        type:String,
        required:true
    },
    dateAtCreated:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHmtl:{
        type:String,
        required:true
    }

})
articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{
            lower:true,
            strict:true,

        })
    }
    if(this.markdown){
       this.sanitizedHmtl=dompurify.sanitize(marked(this.markdown))
    }
    next()
})
module.exports=mongoose.model("Article",articleSchema);