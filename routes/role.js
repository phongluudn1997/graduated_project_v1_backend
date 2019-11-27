const router = require("express").Router();
const RoleController = require("../controllers/RoleController");

router.post("/", RoleController.CreateRole);

module.exports = router;
