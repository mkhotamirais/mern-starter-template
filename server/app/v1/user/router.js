const { getUsers, getSingletUser, postUser, updateUser, deleteUser } = require("./controllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getSingletUser);
router.post("/", postUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
