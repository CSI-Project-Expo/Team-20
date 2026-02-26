/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT,
    "demand_score" INTEGER NOT NULL DEFAULT 0,
    "demand_level" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_skills" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "frequency_weight" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "role_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmaps" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "phase_name" TEXT NOT NULL,
    "step_title" TEXT NOT NULL,
    "step_description" TEXT,
    "step_order" INTEGER NOT NULL,

    CONSTRAINT "roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "project_title" TEXT NOT NULL,
    "project_description" TEXT,
    "difficulty_level" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "job_roles_role_name_key" ON "job_roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_name_key" ON "skills"("skill_name");

-- CreateIndex
CREATE UNIQUE INDEX "role_skills_role_id_skill_id_key" ON "role_skills"("role_id", "skill_id");

-- CreateIndex
CREATE INDEX "roadmaps_role_id_step_order_idx" ON "roadmaps"("role_id", "step_order");

-- AddForeignKey
ALTER TABLE "role_skills" ADD CONSTRAINT "role_skills_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "job_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_skills" ADD CONSTRAINT "role_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "job_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "job_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
