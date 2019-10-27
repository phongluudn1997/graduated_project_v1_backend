const router = require("express").Router();
const UserController = require("../controllers/UserController");
const checkToken = require("../middlewares/checkToken");

router.post("/login", UserController.UserLogin);
router.post("/register", UserController.UserRegister);
router.patch("/update", checkToken, UserController.UpdateUser);
module.exports = router;
