/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `seats` on the `Showroom` table. All the data in the column will be lost.
  - You are about to drop the column `theaterId` on the `Showroom` table. All the data in the column will be lost.
  - You are about to drop the `Theater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Showroom` DROP FOREIGN KEY `Showroom_theaterId_fkey`;

-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showroom` DROP COLUMN `seats`,
    DROP COLUMN `theaterId`;

-- DropTable
DROP TABLE `Theater`;

-- CreateTable
CREATE TABLE `Seat` (
    `seatId` VARCHAR(255) NOT NULL,
    `showroomId` INTEGER NOT NULL,
    `showingId` INTEGER NULL,

    PRIMARY KEY (`seatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_showroomId_fkey` FOREIGN KEY (`showroomId`) REFERENCES `Showroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_showingId_fkey` FOREIGN KEY (`showingId`) REFERENCES `Showing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
