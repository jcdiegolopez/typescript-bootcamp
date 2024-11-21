import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'black',
    'white',
    'purple',
    'orange',
    'pink',
    'brown',
]

async function main() {
  console.log("Seeding database...");

  // Crear 5 colecciones
  const collections = await Promise.all(
    Array.from({ length: 5 }, () =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
        },
      })
    )
  );

  // Crear 15 productos asociados a colecciones
  const products = await Promise.all(
    Array.from({ length: 15 }, async () => {
      const randomCollections = faker.helpers.arrayElements(collections, 2); // Asociar 2 colecciones al azar

      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          descripton: faker.commerce.productDescription(),
          image: faker.image.imageUrl(),
          collections: {
            connect: randomCollections.map((collection) => ({ id: collection.id })),
          },
        },
      });
    })
  );

  // Crear 5 opciones con 15 valores de opciones y asociarlas a productos
  const options = await Promise.all(
    Array.from({ length: 5 }, async (_, optionIndex) => {
      const randomProduct = faker.helpers.arrayElement(products);

      const values = Array.from({ length: 3 }, () => ({
        value: colors[faker.datatype.number({ min: 0, max: colors.length - 1 })],
      }));

      return prisma.option.create({
        data: {
          name: `Option ${optionIndex + 1}`,
          product: { connect: { id: randomProduct.id } },
          values: {
            create: values,
          },
        },
        include: { values: true },
      });
    })
  );

  // Crear 20 variantes y asociarlas a productos y valores de opciones
  await Promise.all(
    Array.from({ length: 20 }, async () => {
      const randomProduct = faker.helpers.arrayElement(products);
      const randomOptionValues = faker.helpers.arrayElements(
        options.flatMap((option) => option.values),
        3
      ); // Elegir 3 valores de opciones al azar

      return prisma.variant.create({
        data: {
          name: faker.commerce.productMaterial(),
          image: faker.image.imageUrl(),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({ min: 1000, max: 5000 }),
          stock: faker.datatype.number({ min: 10, max: 100 }),
          sku: faker.datatype.uuid(),
          product: { connect: { id: randomProduct.id } },
          optionValues: {
            connect: randomOptionValues.map((value) => ({ id: value.id })),
          },
        },
      });
    })
  );

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
   throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
