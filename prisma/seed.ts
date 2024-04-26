import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const name = "Rachel Remix"

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.reference.createMany({
    data: [
      { name: 'Glass product'},
      { name: 'Seal: assembly seal'},
      { name: 'Insulating glazing'},
      { name: 'Desiccant'},
      { name: 'Filling gas'},
      { name: 'Sealant: elastomer'},
      { name: 'Sealant: hot-melt'},
      { name: 'Spacer: metal and synthetic material'},
      { name: 'Spacer: organic extruded'},
      { name: 'System: Georgian bar'},
      { name: 'System: renovation'},
      { name: 'Balanced'},
      { name: 'Seal: butyl'},
      { name: 'Sealant'},
      { name: 'Measurement equipment'},
      { name: 'Equipment test'},
      { name: 'Claim'},
    ],
  })

  await prisma.method.createMany({
    data: [
      { name: 'day'},
      { name: 'every hour'},
      { name: 'week'},
      { name: 'month'}
    ],
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
