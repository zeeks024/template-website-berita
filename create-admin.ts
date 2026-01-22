
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'testingemaill.2412@gmail.com';
    const password = '@Testing12';

    console.log(`Hashing password for ${email}...`);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Upserting user...');
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            isVerified: true,
            name: 'Admin Tester'
        },
        create: {
            email,
            name: 'Admin Tester',
            password: hashedPassword,
            role: 'ADMIN',
            isVerified: true,
        },
    });

    console.log(`SUCCESS: User ${user.email} is ready. Role: ${user.role}, Verified: ${user.isVerified}`);
}

main()
    .catch(e => {
        console.error('ERROR:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
