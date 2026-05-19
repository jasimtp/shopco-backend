const Product = require("../models/product.model");

const parseJson = (value, fallback = []) => {
  try {
    if (!value) return fallback;
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const buildVariantsWithImages = (variants, files) => {
  return variants.map((variant, index) => {
    const newImages = files
      .filter((file) => file.fieldname === `variantImages_${index}`)
      .map((file) => file.path);

    return {
      color: variant.color,
      images: [...(variant.images || []), ...newImages],
    };
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, brand, price, discount, stock } =
      req.body;

    const sizes = parseJson(req.body.sizes);
    const variantsData = parseJson(req.body.variants);

    const variants = buildVariantsWithImages(variantsData, req.files || []);

    const allImages = variants.flatMap((variant) => variant.images);

    const product = await Product.create({
      name,
      description,
      category,
      brand,
      price,
      discount,
      stock,
      sizes,
      variants,
      images: allImages,
      image: allImages[0] || "",
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Create failed",
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Products fetch failed",
      error: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "Product fetch failed",
      error: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { name, description, category, brand, price, discount, stock } =
      req.body;

    const sizes = parseJson(req.body.sizes, product.sizes || []);
    const variantsData = parseJson(req.body.variants, product.variants || []);

    const variants = buildVariantsWithImages(variantsData, req.files || []);
    const allImages = variants.flatMap((variant) => variant.images);

    await product.update({
      name,
      description,
      category,
      brand,
      price,
      discount,
      stock,
      sizes,
      variants,
      images: allImages,
      image: allImages[0] || "",
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};