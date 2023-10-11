/*
  Warnings:

  - The primary key for the `category_properties` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category_properties" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "category_properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_category_properties" ("categoryId", "id", "key", "name") SELECT "categoryId", "id", "key", "name" FROM "category_properties";
DROP TABLE "category_properties";
ALTER TABLE "new_category_properties" RENAME TO "category_properties";
CREATE UNIQUE INDEX "category_properties_id_key" ON "category_properties"("id");
CREATE TABLE "new_establishment_properties" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "propertieId" TEXT NOT NULL,
    CONSTRAINT "establishment_properties_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "establishment_properties_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "category_properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_establishment_properties" ("establishmentId", "id", "propertieId", "value") SELECT "establishmentId", "id", "propertieId", "value" FROM "establishment_properties";
DROP TABLE "establishment_properties";
ALTER TABLE "new_establishment_properties" RENAME TO "establishment_properties";
CREATE UNIQUE INDEX "establishment_properties_id_key" ON "establishment_properties"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
