const {
  getTotalChats,
  resolvedTickets,
  getMissedChats,
  getAverageReplyTime,
} = require("../controllers/analyticsController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.get("/total-chats", verifyAdmin, getTotalChats);
router.get("/resolved", verifyAdmin, resolvedTickets);
router.get("/missed-chats", verifyAdmin, getMissedChats);
router.get("/reply-time", verifyAdmin, getAverageReplyTime);

module.exports = router;
