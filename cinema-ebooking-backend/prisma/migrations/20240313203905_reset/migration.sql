/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;
