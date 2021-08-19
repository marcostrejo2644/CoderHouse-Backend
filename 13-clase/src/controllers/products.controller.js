const productsController = {};
import products from '../products';

productsController.listItems = async (req, res) => {
  try {
    let productVerification = false;
    if (products.length > 0) {
      productVerification = true;
    }
    res.render('main', { productVerification, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = products.find((el) => el.id == id);
    item
      ? res.status(200).json()
      : res.status(404).json({ error: 'item dont found' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.addItem = async (req, res) => {
  try {
    const { product, price, thumbnail } = req.body;
    const id = products.length + 1;
    const newItem = {
      id,
      product,
      price,
      thumbnail,
    };
    products.push(newItem);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, price, thumbnail } = req.body;
    const item = products.findIndex((el) => el.id == id);
    if (item > -1) {
      products[item] = {
        id: item,
        product,
        price,
        thumbnail,
      };
      res.status(200).json({ message: 'Edited with success' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const index = products.findIndex((el) => el.id == id);
    if (index > -1) {
      products.splice(index, 1);
      res.status(200).json({ message: 'Object removed successfully' });
    } else {
      res.status(404).json({ message: 'Object dont found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export default productsController;
