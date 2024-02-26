const { isValidObjectId } = require("mongoose");
const { badRequest, ok, created, conflict } = require("../../../helper/statusCode");
const User = require("./model");
const { genSaltSync, hashSync } = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    ok(res, "get users", result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const getSingletUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
    const result = await User.findById(id);
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, "get single user", result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postUser = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username || !email || !password) return badRequest(res, `semua field harus diisi`);
    const dup1 = await User.findOne({ username });
    if (dup1) return conflict(res, `username sudah terdaftar gunakan useraname lain`);
    const dup2 = await User.findOne({ email });
    if (dup2) return conflict(res, `email sudah terdaftar gunakan email lain`);
    if (password !== confPassword) return badRequest(res, `konfirmasi password salah`);
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    req.body.password = hash;
    const result = await User.create(req.body);
    created(res, `post ${result.username} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
    const result = await User.findByIdAndDelete(id);
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, `delete ${result.username} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return badRequest(res, `id tidak valid`);
    const { username, email } = req.body;
    const dup1 = await User.findOne({ username });
    if (dup1 && username !== dup1.username) return conflict(res, `username sudah terdaftar gunakan useraname lain`);
    const dup2 = await User.findOne({ email });
    if (dup2 && email !== dup2.email) return conflict(res, `email sudah terdaftar gunakan email lain`);
    if (req.body?.password) {
      if (req.body.password !== req.body.confPassword) return badRequest(res, `konfirmasi password salah`);
      const salt = genSaltSync(10);
      const hash = hashSync(req.body.password, salt);
      req.body.password = hash;
    }
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) return badRequest(res, `user dengan id ${id} tidak ditemukan`);
    ok(res, `update ${result.username} berhasil`, result);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getUsers, getSingletUser, postUser, updateUser, deleteUser };
