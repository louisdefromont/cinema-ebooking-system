/*
  Warnings:

  - The primary key for the `BookingInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expirationDate` on the `PaymentCard` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `TicketTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingNum` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditCardNum` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieTitle` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotion` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showDate` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showTime` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discAmount` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regExpression` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Showroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adultPrice` to the `TicketPrices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `childPrice` to the `TicketPrices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniorPrice` to the `TicketPrices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingInfo` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `bookingNum` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `creditCardNum` INTEGER NOT NULL,
    ADD COLUMN `movieTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `promotion` VARCHAR(191) NOT NULL,
    ADD COLUMN `showDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `showTime` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`bookingNum`);

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `PaymentCard` MODIFY `expirationDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Promotion` ADD COLUMN `discAmount` VARCHAR(191) NOT NULL,
    ADD COLUMN `expirationDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `regExpression` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Showing` ADD COLUMN `showroomId` INTEGER NULL,
    MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showroom` ADD COLUMN `seats` INTEGER NOT NULL,
    ADD COLUMN `theaterId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TicketPrices` ADD COLUMN `adultPrice` DOUBLE NOT NULL,
    ADD COLUMN `childPrice` DOUBLE NOT NULL,
    ADD COLUMN `seniorPrice` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `TicketTypes`;

-- CreateTable
CREATE TABLE `TicketType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket` ENUM('ADULT', 'CHILD', 'SENIOR') NOT NULL,
    `bookingInfoBookingNum` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Showing` ADD CONSTRAINT `Showing_showroomId_fkey` FOREIGN KEY (`showroomId`) REFERENCES `Showroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showroom` ADD CONSTRAINT `Showroom_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theater`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketType` ADD CONSTRAINT `TicketType_bookingInfoBookingNum_fkey` FOREIGN KEY (`bookingInfoBookingNum`) REFERENCES `BookingInfo`(`bookingNum`) ON DELETE RESTRICT ON UPDATE CASCADE;
