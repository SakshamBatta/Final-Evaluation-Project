const { inviteTeamMember, getTeam } = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.post("/invite-member", verifyAdmin, inviteTeamMember);
router.get("/get-team", verifyAdmin, getTeam);

module.exports = router;
