const { signup, signin, signtoken, signout } = require("./controllers");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signtoken", signtoken);
router.delete("/signout", signout);

module.exports = router;
