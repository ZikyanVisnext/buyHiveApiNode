import Category from "../models/Category.js";

class CategoryController {
  static async createCategory(req, res) {
    try {
      const newCategory = new Category({
        category_name: req.body.category_name,
        category_slug: req.body.category_slug,
        category_url_slug: req.body.category_url_slug,
        parent_category: req.body.parent_category,
      });
      await newCategory.save();
      res.json(newCategory)
    } catch (error) {
      console.log(error);
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      console.log(error);
    }
  }

}

export default CategoryController;
