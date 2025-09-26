const { authMiddleware, authorizeRoles } = require('../middileware/authMiddleware');
const upload = require('../middileware/uploadMiddleware');
const express = require("express");
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.get('/', authMiddleware, candidateController.getAll);
router.post('/', authMiddleware, authorizeRoles('hr'), upload.single('resume'), candidateController.createCandidate);
router.get('/:id', authMiddleware, candidateController.getOne);
router.put('/:id', authMiddleware, authorizeRoles('hr'), candidateController.updateCandidate);
router.delete('/:id', authMiddleware, authorizeRoles('hr'), candidateController.deleteCandidate);

module.exports = router;
