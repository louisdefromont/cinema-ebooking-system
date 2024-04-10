/*
  Warnings:

  - You are about to drop the column `movieTitle` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to drop the column `showDate` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to drop the column `showTime` on the `BookingInfo` table. All the data in the column will be lost.
  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `seatId` on the `Seat` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `seatId` on the `ShowingSeat` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `adultPrice` on the `TicketPrices` table. All the data in the column will be lost.
  - You are about to drop the column `childPrice` on the `TicketPrices` table. All the data in the column will be lost.
  - You are about to drop the column `seniorPrice` on the `TicketPrices` table. All the data in the column will be lost.
  - You are about to drop the `TicketType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `showingId` to the `BookingInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `TicketPrices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketType` to the `TicketPrices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ShowingSeat` DROP FOREIGN KEY `ShowingSeat_seatId_fkey`;

-- DropForeignKey
ALTER TABLE `TicketType` DROP FOREIGN KEY `TicketType_bookingInfoBookingNum_fkey`;

-- AlterTable
ALTER TABLE `BookingInfo` DROP COLUMN `movieTitle`,
    DROP COLUMN `showDate`,
    DROP COLUMN `showTime`,
    ADD COLUMN `showingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Seat` DROP PRIMARY KEY,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    MODIFY `seatId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`seatId`);

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `ShowingSeat` MODIFY `seatId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TicketPrices` DROP COLUMN `adultPrice`,
    DROP COLUMN `childPrice`,
    DROP COLUMN `seniorPrice`,
    ADD COLUMN `price` FLOAT NOT NULL,
    ADD COLUMN `ticketType` ENUM('ADULT', 'CHILD', 'SENIOR') NOT NULL;

-- DropTable
DROP TABLE `TicketType`;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket` ENUM('ADULT', 'CHILD', 'SENIOR') NOT NULL,
    `bookingNum` INTEGER NOT NULL,
    `seatId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShowingSeat` ADD CONSTRAINT `ShowingSeat_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`seatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingInfo` ADD CONSTRAINT `BookingInfo_showingId_fkey` FOREIGN KEY (`showingId`) REFERENCES `Showing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_bookingNum_fkey` FOREIGN KEY (`bookingNum`) REFERENCES `BookingInfo`(`bookingNum`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`seatId`) ON DELETE RESTRICT ON UPDATE CASCADE;
