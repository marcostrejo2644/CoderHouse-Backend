import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Product from '../models/product.model';
import { mysqlDB } from '../services/knex';

const productsPath = path.join(__dirname, '..', '..', 'products.json');

export async function listAllProducts(req: Request, res: Response) {
  try {
    const products: any = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    products > 0
      ? res.status(200).json(products)
      : res.status(404).json({ messages: "There's no products" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function addNewProduct(req: Request, res: Response) {
  try {
    const { product, price, thumbnail } = req.body;
    if (product && price && thumbnail) {
      const newProduct = new Product(product, price, thumbnail);
      await newProduct.addProduct(newProduct);
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    // const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    // const item = products.find((el: any) => el.id == id);
    const { id } = req.params;
    const item = await mysqlDB.from('products').where('id', id);
    item
      ? res.status(200).json()
      : res.status(404).json({ error: 'item dont found' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { product, price, thumbnail } = req.body;
    // const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    // const item = products.findIndex((el: any) => el.id == id);
    const act = await mysqlDB
      .from('users')
      .where('id', id)
      .update({ product, price, thumbnail });
    res.status(200).json({ message: 'Edited with success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await mysqlDB.from('productos').where({ id }).del();
    res.status(200).json({ message: 'Object removed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}
