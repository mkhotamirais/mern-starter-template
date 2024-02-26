require("dotenv").config();
const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const { PORT: port, MONGO_URI: uri, ACCESS_TOKEN: at, REFRESH_TOKEN: rt } = process.env;

module.exports = { port, uri, at, rt, rootPath };
