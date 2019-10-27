const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/podcasts", require("./podcast"));

module.exports = router;
