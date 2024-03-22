/*
  Warnings:

  - Made the column `name` on table `Pecas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preco` on table `Pecas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laser_id` on table `Pecas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pecas" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "preco" SET NOT NULL,
ALTER COLUMN "laser_id" SET NOT NULL,
ADD CONSTRAINT "Pecas_pkey" PRIMARY KEY ("id");
