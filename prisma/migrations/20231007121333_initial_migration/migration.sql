-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "establishments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "websiteLink" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "establishments_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "establishments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "establishment_properties" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "propertieId" INTEGER NOT NULL,
    CONSTRAINT "establishment_properties_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "establishment_properties_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "category_properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "category_properties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "category_properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_id_key" ON "establishments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_properties_id_key" ON "establishment_properties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");
