const router = require("express").Router();
const UserController = require("../controllers/UserController");
const checkToken = require("../middlewares/checkToken");

router.post("/login", UserController.UserLogin);
router.post("/register", UserController.UserRegister);
router.get("/", UserController.GetAllUsers);
router.patch("/update", checkToken, UserController.UpdateUser);
router.delete("/:_id", UserController.ToggleActivateUser);
module.exports = router;
