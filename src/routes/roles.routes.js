import { Router } from "express";
import { AuthCheck } from "../middleware/authCheck.js";
import { CreateRole, DeleteRole } from "../controllers/roles.controllers.js";
import { ValidateRoleSchema } from "../model/roles.model.js";

const router = Router();

router.post("/createrole", ValidateRoleSchema, CreateRole);
router.delete("/deleterole", ValidateRoleSchema, DeleteRole);
router.get("/getroles");

export default router;
