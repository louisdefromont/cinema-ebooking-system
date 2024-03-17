/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `userId` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PaymentCard` DROP FOREIGN KEY `PaymentCard_id_fkey`;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `PaymentCard` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `PaymentCard` ADD CONSTRAINT `PaymentCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
