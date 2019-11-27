const router = require("express").Router();
const RoleController = require("../controllers/RoleController");

router.post("/", RoleController.CreateRole);
router.get("/", RoleController.GetRoles);

module.exports = router;
