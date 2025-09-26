const moongose=require("mongoose");

const userSchema=new moongose.Schema({
    name:{type:String,required:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{
        type:String,
        enum:["hr",'employee'],
        default:"employee"
    },
    createdAt:{type:Date,default:Date.now}
},{
    timestamps:true
});

module.exports=moongose.model("user",userSchema);