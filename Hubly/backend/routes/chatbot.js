const {
  saveChatbotSettings,
  getChatbotSettings,
  getChatbotMessage,
} = require("../controllers/chatbotController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = require("express").Router();

router.post("/save", verifyAdmin, saveChatbotSettings);
router.get("/get", verifyAdmin, getChatbotSettings);
router.get("/get-message", getChatbotMessage);

module.exports = router;
