/*
  Warnings:

  - You are about to alter the column `value` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,9)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `value` DECIMAL(65, 30) NOT NULL;
