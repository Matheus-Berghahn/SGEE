ALTER TABLE "Adm" ADD COLUMN "failedAttempts" INTEGER NOT NULL DEFAULT 0, ADD COLUMN "lockedUntil" TIMESTAMP(3), ADD COLUMN "passwordChangeRequired" BOOLEAN NOT NULL DEFAULT false;
UPDATE "Adm" SET "passwordChangeRequired"=true WHERE "password" NOT LIKE 'scrypt:%';
CREATE UNIQUE INDEX "Maintenance_open_equipment" ON "Maintenance" ("equipmentId") WHERE "completedAt" IS NULL;
