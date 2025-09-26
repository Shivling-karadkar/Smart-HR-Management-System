const Employee=require('../models/Employee');
const User=require('../models/User');

exports.createEmployee=async(req,res,next)=>{
    try{
        const {name,email,phone,department,position,dateOfJoinig}=req.body;
        const user=await User.findOne({email});
        let userRef=user ? user._id :null;

        const employee=await Employee.create({user:userRef,name,email,phone,department,position,dateOfJoining:dateOfJoinig? new Date(dateOfJoinig):undefined});
        req.io.emit('Employee_Created',employee);
        res.status(200).json({msg:'employee created successfully'});

    }catch(err){
        next(err);
    }
}


exports.getAll=async(req,res,next)=>{
    try{
        const employee=await Employee.find().sort({createEmployee:-1});
        res.json(employee)
    }catch(err){
        next(err);
    }
};

exports.getOne=async(req,res,next)=>{
    try{
        const employee=await Employee.findById({email});
        if(!employee){
            return res.status(404).json({msg:'employee not found'});
        }
        res.json(employee)
    }catch(err){
        next(err);
    }
}

exports.updateEmployee=async(req,res,next)=>{
    try{
        const updates=req.body;
        const employee=await Employee.findByIdAndUpdate(req.params.id,updates,{new:true});
        if(!employee){
            return res.status(404).json({msg:'not found'});
        }
        req.io.emit('Employee_Updated',{id:req.params.id});
        res.json(employee);
    }catch(err){
        next(err);
    }
};


exports.deleteEmployee=async(req,res,next)=>{
    try{
        const employee=await Employee.findByIdAndDelete(req.params.id);
        if(!employee){
            return res.status(404).json({msg:'employee not found'})
        }
        req.io.emit('Employee_Delete',employee);
        res.json(employee);
    }catch(err){
        next(err);
    }
}