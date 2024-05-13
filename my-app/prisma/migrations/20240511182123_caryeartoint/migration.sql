/*
  Warnings:

  - You are about to alter the column `year` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "carID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model_name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "manufacturerIDFK" INTEGER NOT NULL,
    "sellerIDFK" INTEGER NOT NULL,
    CONSTRAINT "Car_sellerIDFK_fkey" FOREIGN KEY ("sellerIDFK") REFERENCES "Seller" ("sellerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_manufacturerIDFK_fkey" FOREIGN KEY ("manufacturerIDFK") REFERENCES "Manufacturer" ("manufacturerID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("carID", "image", "manufacturerIDFK", "model_name", "price", "sellerIDFK", "stock", "year") SELECT "carID", "image", "manufacturerIDFK", "model_name", "price", "sellerIDFK", "stock", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
