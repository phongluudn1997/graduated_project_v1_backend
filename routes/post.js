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

router.post("/", checkToken, upload.single("image"), PostController.uploadPost);
router.get("/", PostController.getPosts);
// router.get("/:type/", PostController.getPostsByType);
router.get("/:type/latest", PostController.getLatest);
router.get("/:id", PostController.getPost);
router.delete("/:_id", PostController.deleteById);
router.patch("/:_id", upload.single("image"), PostController.updateOne);
router.post("/comment", checkToken, PostController.postComment);
module.exports = router;
