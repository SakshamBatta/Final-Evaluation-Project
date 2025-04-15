const router = require("express").Router();

const ticketController = require("../controllers/ticketController");

router.post("/create", ticketController.createTicket);
router.post("/:ticketId/message", ticketController.addMessageToTicket);
router.post("/:ticketId/reply", ticketController.replyToTicket);

module.exports = router;

