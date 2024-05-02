/*
  Warnings:

  - You are about to drop the column `creditCardNum` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BookingInfo` DROP COLUMN `creditCardNum`,
    ADD COLUMN `paymentCardId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `BookingInfo` ADD CONSTRAINT `BookingInfo_paymentCardId_fkey` FOREIGN KEY (`paymentCardId`) REFERENCES `PaymentCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
