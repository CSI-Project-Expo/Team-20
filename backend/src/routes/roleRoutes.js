
import express from 'express';
const router = express.Router();
import { getRoles, getRoleById, getRoleSkills, getRoleRoadmap, getRoleProjects } from '../controllers/roleController.js';

router.get('/', getRoles);
router.get('/:id', getRoleById);
router.get('/:id/skills', getRoleSkills);
router.get('/:id/roadmap', getRoleRoadmap);
router.get('/:id/projects', getRoleProjects);

export default router;
