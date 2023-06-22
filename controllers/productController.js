import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductController {
  static async createProduct(req, res) {
    try {
      const newProduct = new Product({
        product_name: req.body.product_name,
        category_id: req.body.category_id,
      });
      await newProduct.save();
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllProduct(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductByCategory(req, res) {
    try {
      const { categorySlug } = req.params;
      const category = await Category.findOne({ category_slug: categorySlug });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category.parent_category",
            foreignField: "_id",
            as: "parent_category",
          },
        },
        {
          $match: {
            "category.category_slug": categorySlug,
          },
        },
      ]);

      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
  //api to fetch all products that lie under a particular category using lookup
  static async getProductByCategory2(req, res) {
    try {
      const { categorySlug } = req.params;
  
      // Find the category based on the provided slug
      const category = await Category.findOne({ category_slug: categorySlug });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Perform the lookup to fetch the products within the category
      const products = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $match: {
            'category.category_slug': categorySlug
          }
        }
      ]);
  
      res.json({ category, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

}

export default ProductController;
