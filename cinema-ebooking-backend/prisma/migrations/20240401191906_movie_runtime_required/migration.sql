/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `durationMinutes` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL,
    MODIFY `durationMinutes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;
