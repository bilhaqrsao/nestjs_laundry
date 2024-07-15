-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `statusAmbil` VARCHAR(191) NULL,
    ADD COLUMN `statusBayar` VARCHAR(191) NULL,
    ADD COLUMN `tglAmbil` DATETIME(3) NULL;
