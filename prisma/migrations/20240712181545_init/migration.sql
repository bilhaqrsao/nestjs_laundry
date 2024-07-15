-- AlterTable
ALTER TABLE `transaksi` MODIFY `statusAmbil` VARCHAR(191) NULL DEFAULT 'belum',
    MODIFY `statusBayar` VARCHAR(191) NULL DEFAULT 'belum';
