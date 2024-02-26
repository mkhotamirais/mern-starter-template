const { badRequest } = require("../../../helper/statusCode");

const signup = async (req, res) => {
  try {
    res.send("signup");
  } catch (error) {
    badRequest(res, error.message);
  }
};

const signin = async (req, res) => {
  try {
    res.send("signin");
  } catch (error) {
    badRequest(res, error.message);
  }
};

const signtoken = async (req, res) => {
  try {
    res.send("signtoken");
  } catch (error) {
    badRequest(res, error.message);
  }
};

const signout = async (req, res) => {
  try {
    res.send("signout");
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { signup, signin, signtoken, signout };
