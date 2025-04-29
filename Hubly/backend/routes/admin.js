const {
  inviteTeamMember,
  getTeam,
  deleteTeamMember,
} = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.post("/invite-member", verifyAdmin, inviteTeamMember);
router.get("/get-team", verifyAdmin, getTeam);
router.delete("/delete", verifyAdmin, deleteTeamMember);

module.exports = router;
