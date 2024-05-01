/*
  Warnings:

  - You are about to drop the column `promotion` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `ticket` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticketType` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingInfo` DROP COLUMN `promotion`,
    ADD COLUMN `promotionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `ticket`,
    ADD COLUMN `ticketType` ENUM('ADULT', 'CHILD', 'SENIOR') NOT NULL;

-- AddForeignKey
ALTER TABLE `BookingInfo` ADD CONSTRAINT `BookingInfo_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
