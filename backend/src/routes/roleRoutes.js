
const express = require('express');
const router = express.Router();
const {
    getRoles,
    getRoleById,
    getRoleSkills,
    getRoleRoadmap,
    getRoleProjects,
} = require('../controllers/roleController');

router.get('/', getRoles);
router.get('/:id', getRoleById);
router.get('/:id/skills', getRoleSkills);
router.get('/:id/roadmap', getRoleRoadmap);
router.get('/:id/projects', getRoleProjects);

module.exports = router;
