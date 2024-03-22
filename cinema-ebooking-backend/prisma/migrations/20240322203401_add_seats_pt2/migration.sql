/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `showingId` on the `Seat` table. All the data in the column will be lost.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_showingId_fkey`;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Seat` DROP COLUMN `showingId`;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `ShowingSeat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `showingId` INTEGER NOT NULL,
    `seatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShowingSeat_showingId_seatId_key`(`showingId`, `seatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShowingSeat` ADD CONSTRAINT `ShowingSeat_showingId_fkey` FOREIGN KEY (`showingId`) REFERENCES `Showing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShowingSeat` ADD CONSTRAINT `ShowingSeat_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`seatId`) ON DELETE RESTRICT ON UPDATE CASCADE;
