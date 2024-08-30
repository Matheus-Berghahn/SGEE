-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adm" (
    "email" TEXT NOT NULL DEFAULT 'metscaipe',
    "password" TEXT NOT NULL DEFAULT 'admin123'
);
INSERT INTO "new_Adm" ("email", "password") SELECT "email", "password" FROM "Adm";
DROP TABLE "Adm";
ALTER TABLE "new_Adm" RENAME TO "Adm";
CREATE UNIQUE INDEX "Adm_email_key" ON "Adm"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
