import { Request, Response } from 'express';
import Product from '../models/product.mongo';

export async function listAllProducts(req: Request, res: Response) {
  try {
    const products: any = await Product.find({});
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
      const newProduct = new Product({ product, price, thumbnail });
      await newProduct.save();
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const item = await Product.findById({ id });
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
    await Product.findOneAndUpdate(
      { id },
      {
        product,
        price,
        thumbnail,
      }
    );
    res.status(200).json({ message: 'Edited with success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete({ id });
    res.status(200).json({ message: 'Object removed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
}
