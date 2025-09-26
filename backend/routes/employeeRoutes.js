const { authMiddleware, authorizeRoles } = require('../middileware/authMiddleware');

const express= require("express");
const employeeContoller=require('../controllers/employeeController');
const router=express.Router();

router.get('/',authMiddleware,employeeContoller.getAll);
router.post('/',authMiddleware,authorizeRoles('hr'),employeeContoller.createEmployee);
router.get('/:id',authMiddleware,employeeContoller.getOne);
router.put('/:id',authMiddleware,authorizeRoles('hr'),employeeContoller.updateEmployee);
router.delete('/:id',authMiddleware,authorizeRoles('hr'),employeeContoller.deleteEmployee);
module.exports=router;