import { prisma } from "../../prisma/db.js";

const getRoles = async (req, res) => {
    try {
        const roles = await prisma.jobRole.findMany();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching roles' });
    }
};

const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await prisma.jobRole.findUnique({
            where: { id: parseInt(id) },
        });
        if (!role) return res.status(404).json({ error: 'Role not found' });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching role' });
    }
};

const getRoleSkills = async (req, res) => {
    const { id } = req.params;
    try {
        const roleSkills = await prisma.roleSkill.findMany({
            where: { role_id: parseInt(id) },
            include: { skill: true },
            orderBy: { frequency_weight: 'desc' },
        });
        res.json(roleSkills);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching skills' });
    }
};

const getRoleRoadmap = async (req, res) => {
    const { id } = req.params;
    try {
        const roadmap = await prisma.roadmap.findMany({
            where: { role_id: parseInt(id) },
            orderBy: { step_order: 'asc' },
        });
        res.json(roadmap);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching roadmap' });
    }
};

const getRoleProjects = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await prisma.project.findMany({
            where: { role_id: parseInt(id) },
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
};

export {
    getRoles,
    getRoleById,
    getRoleSkills,
    getRoleRoadmap,
    getRoleProjects,
};
