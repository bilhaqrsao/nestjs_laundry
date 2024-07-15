// src/transaksi/transaksi.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) {}

  async create(createTransaksiDto: CreateTransaksiDto, userId: number) {
    const { konsumenId, detailTransaksi } = createTransaksiDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException(`User dengan ID ${userId} tidak ditemukan`);
    }

    const IdUser = user.id;

    let total = 0;

    const newDetailTransaksi = await Promise.all(
      detailTransaksi.map(async (dt) => {
        const layanan = await this.prisma.layanan.findUnique({
          where: { id: dt.layananId },
        });

        if (!layanan) {
          throw new BadRequestException(`Layanan dengan ID ${dt.layananId} tidak ditemukan`);
        }

        const total_harga = layanan.harga * dt.berat;
        total += total_harga;

        return {
          layananId: parseInt(dt.layananId.toString(), 10),
          berat: parseInt(dt.berat.toString(), 10),
          harga: layanan.harga,
          total_harga,
        };
      }),
    );

    const newTransaksi = await this.prisma.transaksi.create({
      data: {
        userId: IdUser,
        konsumenId,
        total,
        detailTransaksi: {
          create: newDetailTransaksi,
        },
      },
      include: {
        detailTransaksi: true,
      },
    });

    return newTransaksi;
  }

  async findAll() {
    return this.prisma.transaksi.findMany({
      include: {
        konsumen: {
          select: {
            nama: true,
          },
        },
        detailTransaksi: {
          include: {
            layanan: {
              select: {
                nama: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.transaksi.findUnique({
      where: { id },
      include: {
        konsumen: {
          select: {
            nama: true,
          },
        },
        detailTransaksi: {
          include: {
            layanan: {
              select: {
                nama: true,
              },
            },
          },
        },
      },
    });
  }

  async updateStatusBayar(id: number) {
    // Ambil transaksi berdasarkan ID
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
    });

    if (!transaksi) {
      throw new BadRequestException(`Transaksi dengan ID ${id} tidak ditemukan`);
    }

    // Cek dan update statusBayar
    if (transaksi.statusBayar === 'belum' || !transaksi.statusBayar) {
      await this.prisma.transaksi.update({
        where: { id },
        data: {
          statusBayar: 'Selesai',
        },
      });
    }

    // Ambil transaksi yang sudah diperbarui
    const updatedTransaksi = await this.prisma.transaksi.findUnique({
      where: { id },
    });

    return {
      message: 'Status Bayar berhasil diupdate',
      data: {
        statusBayar: updatedTransaksi.statusBayar,
      },
    };
  }

  async updateStatusAmbil(id: number) {
    // Ambil transaksi berdasarkan ID
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
    });

    if (!transaksi) {
      throw new BadRequestException(`Transaksi dengan ID ${id} tidak ditemukan`);
    }

    // Tanggal dan waktu saat ini
    const tanggalAmbil = new Date();

    // Update statusAmbil menjadi Selesai dan tglAmbil menjadi tanggalAmbil
    await this.prisma.transaksi.update({
      where: { id },
      data: {
        statusAmbil: 'Selesai',
        tglAmbil: tanggalAmbil,
      },
    });

    // Ambil transaksi yang sudah diperbarui
    const updatedTransaksi = await this.prisma.transaksi.findUnique({
      where: { id },
    });

    return {
      message: 'Status Ambil berhasil diupdate',
      data: {
        statusAmbil: updatedTransaksi.statusAmbil,
        tglAmbil: updatedTransaksi.tglAmbil,
      },
    };
  }

  async update(id: number, updateTransaksiDto: UpdateTransaksiDto) {
    const { detailTransaksi, ...data } = updateTransaksiDto;
  
    let total = 0;
  
    // Proses detail transaksi baru dan yang sudah ada
    const updatedDetailTransaksi = await Promise.all(
      detailTransaksi.map(async (dt) => {
        if (dt.id && dt.delete) {
          await this.deleteDetailTransaksi(dt.id);
          return null; // Skip this detail transaksi from update
        }
  
        // Jika detail transaksi memiliki ID, update atau tambahkan ke transaksi yang ada
        if (dt.id) {
          const existingDetail = await this.prisma.detailTransaksi.findUnique({
            where: { id: dt.id },
          });
  
          if (!existingDetail) {
            throw new BadRequestException(`Detail transaksi dengan ID ${dt.id} tidak ditemukan`);
          }
  
          // Update detail transaksi yang sudah ada
          const layanan = await this.prisma.layanan.findUnique({
            where: { id: dt.layananId },
          });
  
          if (!layanan) {
            throw new BadRequestException(`Layanan dengan ID ${dt.layananId} tidak ditemukan`);
          }
  
          const total_harga = layanan.harga * dt.berat;
          total += total_harga;
  
          return this.prisma.detailTransaksi.update({
            where: { id: dt.id },
            data: {
              layananId: dt.layananId,
              berat: parseInt(dt.berat.toString(), 10),
              harga: layanan.harga,
              total_harga,
            },
          });
        } else {
          // Jika detail transaksi baru, tambahkan ke transaksi
          const layanan = await this.prisma.layanan.findUnique({
            where: { id: dt.layananId },
          });
  
          if (!layanan) {
            throw new BadRequestException(`Layanan dengan ID ${dt.layananId} tidak ditemukan`);
          }
  
          const total_harga = layanan.harga * dt.berat;
          total += total_harga;
  
          return {
            layananId: dt.layananId,
            berat: parseInt(dt.berat.toString(), 10),
            harga: layanan.harga,
            total_harga,
          };
        }
      }),
    );
  
    // Update transaksi dengan detail transaksi yang baru atau diperbarui
    const updatedTransaksi = await this.prisma.transaksi.update({
      where: { id },
      data: {
        ...data,
        total,
        detailTransaksi: {
          deleteMany: {}, // Delete all existing detail transaksi
          create: updatedDetailTransaksi.filter(Boolean), // Filter out null values (deleted details)
        },
      },
      include: {
        detailTransaksi: true,
      },
    });
  
    return updatedTransaksi;
  }
  

  async remove(id: number) {
    // Hapus terlebih dahulu semua detail transaksi terkait
    await this.prisma.detailTransaksi.deleteMany({
      where: {
        transaksiId: id,
      },
    });
  
    // Setelah semua detail transaksi dihapus, baru hapus transaksi itu sendiri
    return this.prisma.transaksi.delete({
      where: {
        id,
      },
    });
  }

  private async deleteDetailTransaksi(id: number) {
    await this.prisma.detailTransaksi.delete({
      where: { id },
    });
  }

  async totalRupiah() {
    const transaksi = await this.prisma.transaksi.findMany({
      include: {
        detailTransaksi: true,
      },
    });
  
    // Calculate the total amount from detailTransaksi
    const totalRupiah = transaksi.reduce((acc, curr) => {
      const totalDetail = curr.detailTransaksi.reduce((detailAcc, detail) => detailAcc + detail.total_harga, 0);
      return acc + totalDetail;
    }, 0);
  
    // Format totalRupiah with thousands separator
    const formattedTotalRupiah = totalRupiah.toLocaleString('id-ID');
  
    // Return as an object with totalRupiah property
    return { totalRupiah: formattedTotalRupiah };
  }  
}
