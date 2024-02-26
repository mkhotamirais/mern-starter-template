const mongoose = require("mongoose");

const V1UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minLength: [3, "minimal panjang username 3 karakter"] },
    email: { type: String, required: true, unique: true, minLength: [5, "minimal panjang email 5 karakter"] },
    password: { type: String, required: true, minLength: [5, "minimal panjang password 5 karakter"] },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("V1User", V1UserSchema);
