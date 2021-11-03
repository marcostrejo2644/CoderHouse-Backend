import faker from 'faker';

export default class productFaker {
  constructor() {
    title: faker.commerce.productName();
    price: Number(faker.commerce.price());
    thumbnail: faker.image.technics();
  }
}
