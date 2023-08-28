const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../middleware/errorResponse");
const Product = require("../models/Product");

// @desc        Get All Products
// @route       Get /api/v1/product
// @access      Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const qNew = req.query.new; // ?new=true
  const qCategory = req.query.category; //?category=men

  console.log(`qnew = ${qNew}`);
  console.log(`qCategory = ${qCategory}`);

  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(3);
  } else if (qCategory) {
    products = await Product.find().where("categories").in([qCategory]);
  } else {
    products = await Product.find({});
  }

  const length = products.length;

  res.status(200).json({ success: true, length, products });
});

// @desc        Get SIngle Product
// @route       Get /api/v1/prodcut/:id
// @access      Public
exports.getSingleProdcut = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({ success: true, product });
});

// @desc        Create New Product
// @route       POST /api/v1/product
// @access      Private
exports.addNewProduct = asyncHandler(async (req, res, next) => {
  // const { title, description, image, categories, size, color, price } = req.body;
  const newProduct = new Product(req.body);

  console.log("new product here", newProduct);

  newProduct.save();

  res.status(200).json({ success: true, newProduct });
});

// @desc        Update Product
// @route       PUT /api/v1/product/:id
// @access      Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, msg: "Product updated", product });
});

// @desc        Delete Product
// @route       Delete /api/v1/product/:id
// @access      Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, msg: "Product deleted" });
});
