const moongose=require("mongoose");

const leaveSchema=new moongose.Schema({
    employee:{type:moongose.Schema.Types.ObjectId,ref:"Employee",required:true},
    startDate:Date,
    endDate:Date,
    reason:String,
    status:{type:String,enum:['pending','approved','rejected'],default:'pending'},
    appliedAt:{type:Date,default:Date.now},
    decideAt:Date,
    decidedBy:{type:moongose.Schema.Types.ObjectId,ref:"User"}
})

module.exports=moongose.model("Leave",leaveSchema)