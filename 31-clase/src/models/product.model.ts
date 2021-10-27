import fs from 'fs';
import path from 'path';

const productsPath = path.join(__dirname, '..', '..', 'products.json');

export default class Product {
  id: number;
  product: string;
  price: number;
  thumbnail: string;

  constructor(product: string, price: number, thumbnail: string) {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    this.id = products.length;
    this.product = product;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  async addProduct(product: any) {
    try {
      // await mysqlDB.from('products').insert(product);
      // const products = await mysqlDB.from('products').select(product);
      // return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
