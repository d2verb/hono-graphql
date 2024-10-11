import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createManyAndReturn({
    data: [...Array(10)].map(() => ({
      email: faker.internet.exampleEmail(),
      name: faker.person.fullName(),
    })),
  });

  for (const user of users) {
    await prisma.post.createMany({
      data: [...Array(10)].map(() => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: user.id,
      })),
    });
  }
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
