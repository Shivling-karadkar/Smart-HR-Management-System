
const moongose=require("mongoose");

const EmployeeSchema=new moongose.Schema({
    user:{type:moongose.Schema.Types.ObjectId,ref:'User'},
    name:String,
    email:String,
    phone:String,
    department:String,
    position:String,
    dateOfJoining:Date,
    createdBy:{
        type:Date,default:Date.now
    }
});

module.exports=moongose.model("Employee",EmployeeSchema);