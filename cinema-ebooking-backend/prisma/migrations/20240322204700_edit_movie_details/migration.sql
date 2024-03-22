/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `durationMinutes` on the `Showing` table. All the data in the column will be lost.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Movie` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `durationMinutes` INTEGER NULL,
    ADD COLUMN `genres` VARCHAR(255) NULL,
    MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` DROP COLUMN `durationMinutes`,
    MODIFY `dateTime` DATETIME NOT NULL;
