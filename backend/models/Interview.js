const moongose=require('mongoose');

const interviewSchema=new moongose.Schema({
    candidate:{type:moongose.Schema.Types.ObjectId,ref:'Candidate',required:true},
    interviewer:String,
    scheduledAt:Date,
    mode:{type:String,enum:['online','onsite'],default:'online'},
    location:String,//link or physical address
    notes:String,
    status:{type:String,enum:['scheduled','completed','cancelled'],default:'scheduled'},
    createdBy:{type:moongose.Schema.Types.ObjectId,ref:'User'}

});

module.exports=moongose.model('Interview',interviewSchema);