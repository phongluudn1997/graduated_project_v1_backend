const router = require("express").Router();
const WritingController = require("../controllers/WritingController");
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
  upload.single("image"),
  WritingController.createWriting
);

router.get("/myWritings", checkToken, WritingController.getAllByMe);
router.get("/", WritingController.getAll);
router.get("/:_id", WritingController.getById);
router.patch("/:_id", checkToken, WritingController.checkWriting);
module.exports = router;
