const { badRequest, ok, created } = require("../../../helper/statusCode");
const Product = require("./model");
const { extname, join } = require("path");
const { existsSync, unlinkSync, renameSync } = require("fs");
const { isValidObjectId } = require("mongoose");
const { rootPath } = require("../../../config/constants");

const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    const count = await Product.find().countDocuments();
    ok(res, `get products, total ${count}`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id ${id} tidak valid`);
  try {
    const product = await Product.findById(id);
    if (!product) return badRequest(res, `product dengan id ${id} tidak ditemukan`);
    ok(res, `get single product`, product);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postProduct = async (req, res) => {
  if (req.file) {
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", "jpeg", ".png"];
    const ext = extname(originalname);
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `Extensi tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `Ukuran file max 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/v1product/${filename + ext}`;
    try {
      const result = await Product.create(req.body);
      if (existsSync(path)) renameSync(path, path + ext);
      created(res, `post product ${req.body.name} berhasil`, result);
    } catch (error) {
      if (existsSync(path + ext)) unlinkSync(path + ext);
      if (existsSync(path)) unlinkSync(path);
      badRequest(res, error.message);
    }
  } else {
    try {
      const result = await Product.create(req.body);
      created(res, `post product ${result.name} berhasil`, result);
    } catch (error) {
      badRequest(res, error.message);
    }
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id ${id} tidak valid`);
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) return badRequest(res, `product dengan id ${id} tidak ditemukan`);
    const path = join(rootPath, "public/images/v1product", `${result?.imageName}`);
    if (existsSync(path)) unlinkSync(path);
    ok(res, `delete product ${result.name} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return badRequest(res, `id ${id} tidak valid`);
  if (req.file) {
    const match = await Product.findById(id);
    const { originalname, filename, path, size } = req.file;
    const validExt = [".jpg", ".jpeg", ".png"];
    const ext = extname(originalname);
    if (!match) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
    }
    const dup = await Product.findOne({ name: req.body.name });
    if (req.body.name !== match.name && dup) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `produk bernama ${dup.name} sudah ada, gunakan nama lain`);
    }
    if (!validExt.includes(ext)) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `Extensi file tidak valid`);
    } else if (size > 2000000) {
      if (existsSync(path)) unlinkSync(path);
      return badRequest(res, `Ukuran file maksimal 2mb`);
    }
    req.body.imageName = filename + ext;
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/v1product/${filename + ext}`;
    try {
      const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
      const pathOld = join(rootPath, "public/images/v1product", `${match?.imageName}`);
      if (!existsSync(pathOld)) {
        renameSync(path, path + ext);
        return ok(res, `update ${result.name} berhasil`, result);
      }
      unlinkSync(pathOld);
      renameSync(path, path + ext);
      return ok(res, `update ${result.name} berhasil`, result);
    } catch (error) {
      if (existsSync(path)) unlinkSync(path);
      if (existsSync(path + ext)) unlinkSync(path + ext);
      badRequest(res, error.message);
    }
  } else {
    try {
      const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!result) return badRequest(res, `Data dengan id ${id} tidak ditemukan`);
      ok(res, `update product ${result.name} berhasil`, result);
    } catch (error) {
      badRequest(res, error.message);
    }
  }
};

module.exports = { getProducts, getSingleProduct, postProduct, updateProduct, deleteProduct };
