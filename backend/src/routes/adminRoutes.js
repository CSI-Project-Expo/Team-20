
import express from 'express';
const router = express.Router();
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { createRole, updateRole, deleteRole, createSkill, addSkillToRole, getAllSkills, createRoadmapStep, deleteRoadmapStep } from '../controllers/adminController.js';

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

export default router;
