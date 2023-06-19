import { Router } from "express";
import {
  DeleteTicket,
  IssueTicket,
} from "../controllers/tickets.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { ValidateTicketSchema } from "../model/ticket.model.js";

const router = Router();
router.post("/issueticket", ValidateTicketSchema, IssueTicket);
router.delete("/deleteticket", ValidateTicketSchema, DeleteTicket);

export default router;
