/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expirationDate` on the `PaymentCard` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateTime` on the `Showing` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `billCity` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billState` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardName` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvv` to the `PaymentCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movie` MODIFY `releaseDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `PaymentCard` ADD COLUMN `billCity` VARCHAR(255) NOT NULL,
    ADD COLUMN `billState` VARCHAR(255) NOT NULL,
    ADD COLUMN `cardName` VARCHAR(255) NOT NULL,
    ADD COLUMN `cvv` INTEGER NOT NULL,
    MODIFY `expirationDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Showing` MODIFY `dateTime` DATETIME NOT NULL;
