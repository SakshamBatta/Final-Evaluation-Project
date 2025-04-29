const router = require("express").Router();

const ticketController = require("../controllers/ticketController");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/create", ticketController.createTicket);
router.post("/:ticketId/message", ticketController.addMessageToTicket);
router.post("/:ticketId/reply", ticketController.replyToTicket);
router.get("/get/tickets", verifyAdmin, ticketController.getAllTickets);
router.put("/:ticketId/resolve", verifyAdmin, ticketController.resolveTicket);
router.put("/assign", verifyAdmin, ticketController.assignTicket);

module.exports = router;
