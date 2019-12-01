const router = require("express").Router();
const UserController = require("../controllers/UserController");
const checkToken = require("../middlewares/checkToken");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });
router.get("/profile", checkToken, UserController.getOwnProfile);
router.patch(
  "/profile",
  checkToken,
  upload.single("avatar"),
  UserController.updateOwnProfile
);
router.post("/login", UserController.UserLogin);
router.post("/register", UserController.UserRegister);
router.get("/", UserController.GetAllUsers);
// router.patch("/update", checkToken, UserController.UpdateUser);
router.patch("/:_id", upload.single("avatar"), UserController.UpdateUser);
router.delete("/:_id", UserController.ToggleActivateUser);
router.get("/:_id", UserController.getUserById);

module.exports = router;
