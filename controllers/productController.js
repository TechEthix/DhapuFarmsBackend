const Product = require('../models/Product');


const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};


const createProduct = async (req, res) => {
  const { title, image, description, category, price, benefits } = req.body;

  const product = new Product({
    title,
    image,
    description,
    category,
    price,
    benefits
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};


const updateProduct = async (req, res) => {
  const { title, image, description, category, price, benefits } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.image = image;
    product.description = description;
    product.category = category;
    product.price = price;
    product.benefits = benefits;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
