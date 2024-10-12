import { faker } from '@faker-js/faker';
import { IProduct } from '@interfaces';
import mongoose from 'mongoose';

export const generateProducts = async (quantity: number) => {
  await withConnection(async () => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
      products.push(generate());
    }
    await mongoose.connection
      .collection('products')
      .insertMany(products as any);
  });
};

export const generateProductWith = async (product?: Partial<IProduct>) => {
  await withConnection(async () => {
    const generatedProduct = generate(product);
    await mongoose.connection
      .collection('products')
      .insertOne(generatedProduct as any);
  });
};

export const clearProducts = async () => {
  await withConnection(async () => {
    await mongoose.connection.collection('products').deleteMany({});
  });
};

const generate = (product?: Partial<IProduct>) => {
  return {
    _id: faker.number.int(),
    creator: faker.person.firstName(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    brands: faker.company.name(),
    categories: faker.food.ethnicCategory(),
    cities: faker.location.city(),
    code: faker.number.int(),
    image_url: faker.image.url(),
    imported_t: faker.date.recent(),
    ingredients_text: faker.lorem.sentence(),
    main_category: faker.commerce.department(),
    labels: faker.lorem.word(),
    product_name: faker.commerce.productName(),
    last_modified_t: faker.date.recent(),
    nutriscore_grade: faker.helpers.arrayElement(['a', 'b', 'c', 'd', 'e']),
    nutriscore_score: faker.number.int(),
    purchase_places: faker.location.city(),
    quantity: faker.number.int().toString(),
    serving_quantity: faker.number.int(),
    serving_size: faker.commerce.productMaterial(),
    stores: faker.company.name(),
    traces: faker.lorem.word(),
    url: faker.internet.url(),
    created_t: faker.date.recent(),
    ...product,
  };
};

const withConnection = async (fn: () => Promise<void>) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    await fn();
  } finally {
    await mongoose.disconnect();
  }
};
