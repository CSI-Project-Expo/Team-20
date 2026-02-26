
import { prisma } from "../../prisma/db.js";

// --- Roles ---
const createRole = async (req, res) => {
    try {
        const role = await prisma.jobRole.create({ data: req.body });
        res.json(role);
    } catch (error) {
        res.status(400).json({ error: 'Error creating role' });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await prisma.jobRole.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(role);
    } catch (error) {
        res.status(400).json({ error: 'Error updating role' });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.jobRole.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Role deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting role' });
    }
};

// --- Skills ---
const getAllSkills = async (req, res) => {
    try {
        const skills = await prisma.skill.findMany();
        res.json(skills);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createSkill = async (req, res) => {
    try {
        const skill = await prisma.skill.create({ data: req.body });
        res.json(skill);
    } catch (error) {
        res.status(400).json({ error: 'Error creating skill' });
    }
};

const addSkillToRole = async (req, res) => {
    const { id } = req.params; // role_id
    const { skill_id, frequency_weight } = req.body;
    try {
        const roleSkill = await prisma.roleSkill.create({
            data: {
                role_id: parseInt(id),
                skill_id: parseInt(skill_id),
                frequency_weight: parseInt(frequency_weight),
            },
        });
        res.json(roleSkill);
    } catch (error) {
        res.status(400).json({ error: 'Error adding skill to role' });
    }
};

// --- Roadmap ---
const createRoadmapStep = async (req, res) => {
    try {
        const step = await prisma.roadmap.create({ data: req.body });
        res.json(step);
    } catch (error) {
        res.status(400).json({ error: 'Error creating roadmap step' });
    }
};

const deleteRoadmapStep = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.roadmap.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Step deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting step' });
    }
}

export {
    createRole,
    updateRole,
    deleteRole,
    getAllSkills,
    createSkill,
    addSkillToRole,
    createRoadmapStep,
    deleteRoadmapStep
};
