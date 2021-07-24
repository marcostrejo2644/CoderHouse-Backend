import fs from 'fs/promises';

class Archivo {
  constructor(file) {
    this.file = file;
    this.content = [];
  }

  addProduct = async (title, price, thumbnail) => {
    try {
      const arr = this.content.push({
        title,
        price,
        thumbnail,
        id: this.content.length + 1,
      });
      await fs.writeFile(this.file, JSON.stringify(this.content, null, 2));
      console.log(`${arr.title} added succesfully to ${this.fie}`);
    } catch (error) {
      console.log(error);
    }
  };

  readProducts = async () => {
    try {
      const readedFile = await fs.readFile(this.file, 'utf-8');
      console.log(readedFile);
    } catch (error) {
      console.log(this.content);
    }
  };

  deleteProducts = async () => {
    try {
      await fs.unlink(this.file);
      console.log(`Archivo ${this.file} borrado`);
    } catch (error) {
      console.log('No se pudo borrar archivo');
    }
  };
}

const products = new Archivo('product.txt');
products
  .addProduct('Arroz', 128.34, 'https://bit.ly/3zjJXCh')
  .then(() => {
    products.addProduct('Papa', 200, 'https://bit.ly/3zh4584');
  })
  .then(() => {
    products.addProduct('Mandarina', 500.55, 'https://bit.ly/3zocqab');
  })
  .then(() => {
    products.addProduct('Cebolla', 150.24, 'https://bit.ly/3kIwa42');
  })
  .then(() => {
    products.readProducts();
  })
  .then(() => {
    products.deleteProducts();
  })
  .catch((e) => {
    console.log(e);
  });
