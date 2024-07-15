// prisma/seeders/userSeeder.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPasswordDeveloper = await bcrypt.hash('1', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'dev@example.com',
        username: 'developer',
        name: 'Developer',
        password: hashedPasswordDeveloper,
        roleId: 1, // sesuaikan dengan id role Admin
      },
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
