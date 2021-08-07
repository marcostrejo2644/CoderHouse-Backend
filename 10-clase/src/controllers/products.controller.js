const productsController = {};
const products = [
  {
    id: 5,
    product: 'atr',
    price: 500,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-256.png',
  },
  {
    id: 2,
    product: 'asdasd',
    price: 700,
    thumbnail:
      'https://cdn2.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Zhihu-128.png',
  },
  {
    id: 1,
    product: 'wasaaaa',
    price: 9000,
    thumbnail:
      'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-128.png',
  },
];

productsController.viewItems = async (req, res) => {
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

productsController.getItem = async (req, res) => {
  try {
    products.length >= 1
      ? res.status(200).json(products)
      : res.status(404).json({ message: 'theres no products' });
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
    res.render('form');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.editItem = async (req, res) => {
  try {
    console.log(products);
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
