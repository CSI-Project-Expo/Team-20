
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@example.com',
            password_hash: adminPassword,
            role: 'admin',
        },
    });

    console.log('Admin created.');

    // Create Job Roles
    const roles = [
        { role_name: 'Full Stack Developer', demand_score: 95, demand_level: 'High' },
        { role_name: 'Frontend Developer', demand_score: 90, demand_level: 'High' },
        { role_name: 'Backend Developer', demand_score: 85, demand_level: 'High' },
        { role_name: 'Data Analyst', demand_score: 80, demand_level: 'Medium' },
        { role_name: 'AI/ML Engineer', demand_score: 98, demand_level: 'High' },
    ];

    for (const r of roles) {
        await prisma.jobRole.upsert({
            where: { role_name: r.role_name },
            update: {},
            create: r,
        });
    }

    console.log('Roles created.');

    // Create Skills
    const skills = [
        { skill_name: 'React', category: 'Frontend' },
        { skill_name: 'Node.js', category: 'Backend' },
        { skill_name: 'SQL', category: 'DB' },
        { skill_name: 'Python', category: 'Backend' },
        { skill_name: 'TensorFlow', category: 'AI' },
    ];

    for (const s of skills) {
        await prisma.skill.upsert({
            where: { skill_name: s.skill_name },
            update: {},
            create: s,
        });
    }

    console.log('Skills created.');

    // Attach Skills to Roles (Example)
    const fullStack = await prisma.jobRole.findUnique({ where: { role_name: 'Full Stack Developer' } });
    const react = await prisma.skill.findUnique({ where: { skill_name: 'React' } });
    const node = await prisma.skill.findUnique({ where: { skill_name: 'Node.js' } });
    const sql = await prisma.skill.findUnique({ where: { skill_name: 'SQL' } });

    if (fullStack) {
        if (react) await prisma.roleSkill.create({ data: { role_id: fullStack.id, skill_id: react.id, frequency_weight: 90 } }).catch(() => { });
        if (node) await prisma.roleSkill.create({ data: { role_id: fullStack.id, skill_id: node.id, frequency_weight: 85 } }).catch(() => { });
        if (sql) await prisma.roleSkill.create({ data: { role_id: fullStack.id, skill_id: sql.id, frequency_weight: 75 } }).catch(() => { });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
