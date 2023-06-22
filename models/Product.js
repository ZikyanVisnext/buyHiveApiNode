import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name:{
    type: String,
    required: true,
    unique: true
  },
  category_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
