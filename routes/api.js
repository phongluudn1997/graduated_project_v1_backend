const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/post", require("./post"));
router.use("/podcasts", require("./podcast"));

module.exports = router;
