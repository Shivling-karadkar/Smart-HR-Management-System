const Leave=require('../models/Leave');
const employee=require('../models/Employee');

exports.applyLeave =async(req,res,next)=>{
    try{
       const {employeeId,startDate,endDate,reason}=req.body;
       const apply=await Leave.create({employee:employeeId,startDate,endDate,reason});
       req.io.emit('Leave_applied',apply);
       res.status(200).json(apply)
       
    
    }catch(err){
        next(err)
    }
}

exports.getAll=async(req,res,next)=>{
    try{
        const leave=await Leave.find().sort({appliedAt:-1});
        if(!leave){
            return res.status(404).json({msg:"leave not found"})
        }
        res.json(leave);
        
    }catch(err){
        next(err)
    }
};

exports.updateStatus=async(req,res,next)=>{
    try{
        const {status}=req.body;
        const leave= await Leave.findById(req.params.id);
        if(!leave){
            return res.status(404).json({msg:"not updated status"});
        }
        leave.status=status
        leave.decideAt=new Date();
        await leave.save();
        req.io.emit('Leave_Updated',leave);
        res.json(leave)
    }catch(err){
        next(err);
    }
}
