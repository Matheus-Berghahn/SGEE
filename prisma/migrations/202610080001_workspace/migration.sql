-- DropIndex
DROP INDEX "Adm_email_key";

-- AlterTable
ALTER TABLE "Adm" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Administrador',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ADMIN',
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "password" DROP DEFAULT,
ADD CONSTRAINT "Adm_pkey" PRIMARY KEY ("email");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Equipamento" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "assetTag" TEXT,
ADD COLUMN     "brand" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "model" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "purchaseCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "serial" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "warrantyUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Session" (
    "tokenHash" TEXT NOT NULL,
    "accountEmail" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "fromName" TEXT,
    "toName" TEXT,
    "note" TEXT NOT NULL DEFAULT '',
    "actor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "vendor" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'aberta',
    "dueAt" TIMESTAMP(3),
    "costCents" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "company" TEXT NOT NULL DEFAULT 'SGEE',

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE INDEX "Movement_equipmentId_createdAt_idx" ON "Movement"("equipmentId", "createdAt");

-- CreateIndex
CREATE INDEX "Maintenance_status_dueAt_idx" ON "Maintenance"("status", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_assetTag_key" ON "Equipamento"("assetTag");

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_serial_key" ON "Equipamento"("serial");

-- CreateIndex
CREATE INDEX "Equipamento_status_tipo_idx" ON "Equipamento"("status", "tipo");

-- CreateIndex
CREATE INDEX "Equipamento_userId_idx" ON "Equipamento"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_accountEmail_fkey" FOREIGN KEY ("accountEmail") REFERENCES "Adm"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Equipamento" ALTER COLUMN "updatedAt" DROP DEFAULT;
UPDATE "Equipamento" SET "status" = CASE WHEN "status" IN ('manutenção', 'baixado') THEN "status" WHEN "userId" IS NOT NULL THEN 'em uso' ELSE 'disponível' END;
