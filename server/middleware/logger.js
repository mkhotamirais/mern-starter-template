const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const { existsSync, mkdirSync, appendFileSync } = require("fs");
const { join } = require("path");
const { rootPath } = require("../config/constants");

const logEvents = (fileName, message) => {
  try {
    let log = `${format(new Date(), "yyyymmdd-hh:mm:ss")}\t${uuidv4()}\t${message}\n`;
    if (!existsSync(join(rootPath, "logs"))) mkdirSync(join(rootPath, "logs"));
    appendFileSync(join(rootPath, "logs", fileName), log);
  } catch (error) {
    console.log(error);
  }
};

const logSuccess = (req, res, next) => {
  let log = `${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents("log-success.log", log);
  console.log(log);
  next();
};

const logError = (err, req, res, next) => {
  let log = `${err.name}: ${err.message}`;
  logEvents("log-error.log", log);
  next();
};

module.exports = { logEvents, logSuccess, logError };
