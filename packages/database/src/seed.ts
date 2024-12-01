import { PrismaClient } from '../prisma/prisma-client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const colors = [
  'DEM',
  'SEM',
  'LAT',
  'FOL',
  'JON',
  'SUN',
  'TEL',
  'FAN',
  'ZAT',
  'JYL',
];

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

  // Crear 15 productos asociados a colecciones, cada uno con una imagen diferente
  const products = await Promise.all(
    Array.from({ length: 15 }, async () => {
      const randomCollections = faker.helpers.arrayElements(collections, 2); // Asociar 2 colecciones al azar

      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          image: faker.image.imageUrl(640, 480, 'technics', true), // Imagen única para cada producto
          price: faker.datatype.number({ min: 1000, max: 5000 }), // Precio del producto
          collections: {
            connect: randomCollections.map((collection) => ({ id: collection.id })),
          },
        },
      });
    })
  );

  // Crear 5 opciones con valores y asociarlas a productos
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

  // Crear 20 variantes y asociarlas a productos y valores de opciones, con imágenes diferentes
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
          image: faker.image.imageUrl(640, 480, 'fashion', true), // Imagen única para cada variante
          description: faker.lorem.sentence(),
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
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
