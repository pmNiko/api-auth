// funciones de respuesta a los endpoint de products

// importación del modelo Product
import Product from "../models/Product";

// crear un nuevo product POST
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const product = new Product({ name, category, price, imgURL });
  let productSaved = await product.save();
  res.status(201).json(productSaved);
};

// todos los productos GET
export const getProducts = async (req, res) => {
  let products = await Product.find();
  res.status(200).json(products);
};

// buscar un producto por ID GET
export const getProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.status(200).json(product);
};

// actualizar un producto por ID PUT
export const updateProduct = async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(product);
};

// borrar un producto por ID DELETE
export const deleteProduct = async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json(product);
};
