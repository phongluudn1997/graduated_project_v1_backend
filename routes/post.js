const router = require("express").Router();
const PostController = require("../controllers/PostController");
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

router.post(
  "/",
  checkToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  PostController.uploadPost
);
// router.get("/", PostController.getPosts);
router.get("/:type/", PostController.getPostsByType);
router.get("/:type/:id", PostController.getPost);

module.exports = router;
