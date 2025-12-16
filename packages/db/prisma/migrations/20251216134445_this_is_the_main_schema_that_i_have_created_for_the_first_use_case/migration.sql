/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `publishAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `PostVersion` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `SocialAccount` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `SocialVariant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `TenantMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialAccountId` to the `SocialVariant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TenantRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'BILLING_MANAGER');

-- DropForeignKey
ALTER TABLE "TenantMember" DROP CONSTRAINT "TenantMember_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "TenantMember" DROP CONSTRAINT "TenantMember_userId_fkey";

-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "timestamp",
ADD COLUMN     "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "publishAt",
ADD COLUMN     "aiPrompt" TEXT,
ADD COLUMN     "body" JSONB;

-- AlterTable
ALTER TABLE "PostVersion" DROP COLUMN "authorId",
ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "projectDescription" TEXT,
ADD COLUMN     "projectName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SocialAccount" DROP COLUMN "providerId",
ADD COLUMN     "providerUserId" TEXT;

-- AlterTable
ALTER TABLE "SocialVariant" DROP COLUMN "provider",
ADD COLUMN     "socialAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
DROP COLUMN "username";

-- DropTable
DROP TABLE "TenantMember";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "TenantUser" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TenantRole" NOT NULL,

    CONSTRAINT "TenantUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantUser_tenantId_userId_key" ON "TenantUser"("tenantId", "userId");

-- CreateIndex
CREATE INDEX "Post_projectId_idx" ON "Post"("projectId");

-- CreateIndex
CREATE INDEX "Project_tenantId_idx" ON "Project"("tenantId");

-- AddForeignKey
ALTER TABLE "TenantUser" ADD CONSTRAINT "TenantUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantUser" ADD CONSTRAINT "TenantUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialVariant" ADD CONSTRAINT "SocialVariant_socialAccountId_fkey" FOREIGN KEY ("socialAccountId") REFERENCES "SocialAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
