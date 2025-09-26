const { default: mongoose } = require("mongoose");
const moongose=require("mongoose");

const candidateSchema=new moongose.Schema({
    name:{type:String,required:true},
    email:{type:String,require:true,unique:true},
    phone:String,
    resumeUrl:String,
    skills:[String],
    status:{
        type:String,
        enum:["applied",'interview_scheduled','selected','rejected'],
        default:"applied"
    },
    appliedAt:{type:Date,default:Date.now},
    notes:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" //hr who added
    }
});

module.exports=moongose.model("Candidate",candidateSchema);