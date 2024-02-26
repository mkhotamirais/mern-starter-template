const multer = require("multer");
const path = require("path");
const { rootPath } = require("../config/constants");

const uploadV1Product = multer({ dest: path.join(rootPath, "public/images/v1product") }).single("image");

module.exports = { uploadV1Product };
