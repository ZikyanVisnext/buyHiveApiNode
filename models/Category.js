import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name:{
    type: String,
    required: true
  },
  category_slug:{
    type: String,
    required: true
  },
  category_url_slug:{
    type: String,
    required: true
  },
  parent_category:{
    type: mongoose.Schema.Types.ObjectId,
  }
  });

const Category = mongoose.model("Category", categorySchema);

export default Category;
