const router = require("express").Router();
const PodcastController = require("../controllers/PodcastController");
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
  PodcastController.upload
);
// router.get("/", PodcastController.getPosts);
router.get("/", PodcastController.getAll);
router.get("/latest", PodcastController.getLatest);
router.get("/:id", PodcastController.getOne);
router.patch(
  "/:_id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  PodcastController.updateOne
);
router.delete("/:_id", PodcastController.deleteById);

module.exports = router;
