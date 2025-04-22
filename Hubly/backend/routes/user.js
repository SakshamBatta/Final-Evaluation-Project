const { getProfile, updateProfile } = require("../controllers/userController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.get("/get-profile", verifyAdmin, getProfile);
router.put("/update-profile", verifyAdmin, updateProfile);

module.exports = router;
