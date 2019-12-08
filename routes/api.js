const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/posts", require("./post"));
router.use("/podcasts", require("./podcast"));
router.use("/roles", require("./role"));
router.use("/writings", require("./writing"));
module.exports = router;
