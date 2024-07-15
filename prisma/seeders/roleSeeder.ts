import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'Developer', description: 'Developer role' },
      { name: 'Super admin', description: 'Super admin role' },
      { name: 'Admin', description: 'Administrator role' },
      { name: 'User', description: 'Regular user role' },
      // tambahkan role lainnya sesuai kebutuhan
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
