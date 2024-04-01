/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `movieId` to the `Showing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Showing` DROP FOREIGN KEY `Showing_id_fkey`;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` ADD COLUMN `movieId` INTEGER NOT NULL,
    MODIFY `dateTime` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Showing` ADD CONSTRAINT `Showing_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
