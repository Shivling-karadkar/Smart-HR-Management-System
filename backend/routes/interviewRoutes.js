const { authMiddleware, authorizeRoles } = require('../middileware/authMiddleware');

const express= require("express");
const InterviewContoller=require('../controllers/interviewController');
const router=express.Router();

router.get('/',authMiddleware,InterviewContoller.getAll);
router.post('/',authMiddleware,authorizeRoles('hr'),InterviewContoller.schedule);

router.put('/:id',authMiddleware,authorizeRoles('hr'),InterviewContoller.update);
router.delete('/id',authMiddleware,authorizeRoles('hr'),InterviewContoller.delete);
module.exports=router;