/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `state` to the `CustomerState` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingAddress` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNum` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTime` to the `Showing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMinutes` to the `Showing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingInfo` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `CustomerState` ADD COLUMN `state` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `PaymentCard` ADD COLUMN `billingAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `cardNum` INTEGER NOT NULL,
    ADD COLUMN `expirationDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` ADD COLUMN `dateTime` DATETIME NOT NULL,
    ADD COLUMN `durationMinutes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(255) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `PaymentCard` ADD CONSTRAINT `PaymentCard_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerState` ADD CONSTRAINT `CustomerState_id_fkey` FOREIGN KEY (`id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showing` ADD CONSTRAINT `Showing_id_fkey` FOREIGN KEY (`id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingInfo` ADD CONSTRAINT `BookingInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
