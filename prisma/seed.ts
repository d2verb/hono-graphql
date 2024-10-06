import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
    },
  });

  await prisma.post.create({
    data: {
      title: "Test Post",
      content: "Test Content",
      authorId: user.id,
    },
  });
}

main()
  .then(async () => {
    console.log("Seeded database");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
