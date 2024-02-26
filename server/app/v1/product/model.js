const mongoose = require("mongoose");

const V1ProductSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minLength: [3, "panjang produk minimal 3 karakter"], required: true },
    price: { type: Number, required: true, min: [3, "panjang harga minimal 3 digit"] },
    imageName: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("V1Product", V1ProductSchema);
