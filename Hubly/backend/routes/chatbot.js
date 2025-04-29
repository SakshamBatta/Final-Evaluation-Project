const {
  saveChatbotSettings,
  getChatbotSettings,
} = require("../controllers/chatbotController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.post("/save", verifyAdmin, saveChatbotSettings);
router.get("/get", verifyAdmin, getChatbotSettings);

module.exports = router;
