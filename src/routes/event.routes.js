import { Router } from "express";
import GetEvents, {
  CreateEvent,
  DeleteEvent,
  EditEvent,
} from "../controllers/events.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { ValidateEventSchema } from "../model/events.model.js";

const router = Router();

router.post(
  "/createevent",
  ValidateEventSchema,
  PermissionCheck("eventManager"),
  CreateEvent
);
router.patch(
  "/editevent",
  ValidateEventSchema,
  PermissionCheck("eventManager"),
  EditEvent
);
router.delete(
  "/deleteevent",
  ValidateEventSchema,
  PermissionCheck("eventManager"),
  DeleteEvent
);
router.get("/getevents", GetEvents);
export default router;
