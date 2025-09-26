const { authMiddleware, authorizeRoles } = require('../middileware/authMiddleware');

const express= require("express");
const leaveContoller=require('../controllers/leaveController');
const router=express.Router();

router.post('/',authMiddleware,leaveContoller.applyLeave);

router.get('/',authMiddleware,leaveContoller.getAll);
router.put('/:id/status',authMiddleware,authorizeRoles('hr'),leaveContoller.updateStatus);

module.exports=router;