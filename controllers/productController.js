const Product = require('../models/productModel');


const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};


const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};


const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !price || !category || inStock === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProduct = await Product.create({ name, description, price, category, inStock });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};


const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};


const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
