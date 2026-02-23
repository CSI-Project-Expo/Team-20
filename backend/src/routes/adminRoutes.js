
const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const {
    createRole,
    updateRole,
    deleteRole,
    getAllSkills,
    createSkill,
    addSkillToRole,
    createRoadmapStep,
    deleteRoadmapStep
} = require('../controllers/adminController');

// All routes here are protected
router.use(authMiddleware);
router.use(adminMiddleware);

// Roles
router.post('/roles', createRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

// Skills
router.get('/skills', getAllSkills);
router.post('/skills', createSkill);
router.post('/roles/:id/skills', addSkillToRole);

// Roadmap
router.post('/roadmap', createRoadmapStep);
router.delete('/roadmap/:id', deleteRoadmapStep);

module.exports = router;
