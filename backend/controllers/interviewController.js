const Interview=require('../models/Interview');
const Candidate=require('../models/Candidate');
const {sendEmail}=require('../utils/email');

exports.schedule=async(req,res,next)=>{
    try{
        const {candidateId,interviewer,scheduledAt,mode,location,notes}=req.body;
        const candidate=await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({msg:"candidate not found"});
        }

        const interview=await Interview.create({
            Candidate:candidateId,
            interviewer,scheduledAt,mode,location,notes,
            createdBy:req.user.id
        });

        // update candidate status
        candidate.status='scheduled';
        await candidate.save();

        // notify
        req.io.emit('scheduled',{interview,candidate});

        //sending mail
        sendEmail({to:candidate.email,subject :`Interview scheduled`,text:'...'});

        res.status(201).json(interview);

    }catch(err){
        next(err);
    }
};

exports.getAll=async(req,res,next)=>{
    try{
        const list=await Interview.find().populate('candidate').sort({scheduledAt:-1});
        res.json(list);
    }catch(Err){
        next(Err);
    }
};

exports.update=async(req,res,next)=>{
    try{
        const update=req.body;
        const interview=await Interview.findByIdAndUpdate(req.params.id,update,{new:true});
        req.io.emit('interview_updated',interview);
        res.json(interview);
    }catch(err){
        next(err)
    }
};

exports.delete=async(req,res,next)=>{
    try{
        const interview=await Interview.findByIdAndDelete(req.params.id);
        req.io.emit('Interview_deleted',{id:req.params.id});
        res.json({msg:"Deleted"});
    }catch(err){
        next(err);
    }
}

