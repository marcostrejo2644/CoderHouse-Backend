const productsController = {};
const products = [
  {
    id: 5,
    product: 'atr',
    price: 500,
  },
  {
    id: 2,
    product: 'atr',
    price: 500,
  },
  {
    id: 1,
    product: 'atr',
    price: 500,
  },
];

productsController.getItem = async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

productsController.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = products.find((el) => el.id == id);
    if (item) res.status(200).json();
    else res.status(404).json({ error: 'item dont found' });
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
    res.status(201).json({ message: 'new product added succesfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export default productsController;
