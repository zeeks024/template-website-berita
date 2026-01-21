const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing database...');
    try {
        await prisma.article.deleteMany({});
        console.log('All articles deleted successfully.');
    } catch (e) {
        console.error('Error deleting articles:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
