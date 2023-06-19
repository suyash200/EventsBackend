import { Router } from "express";
import {
  CreatePermission,
  DeletePermission,
} from "../controllers/permissions.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { ValidatepermissionSchema } from "../model/permissions.model.js";

const router = Router();

router.post(
  "/createpermission",
  ValidatepermissionSchema,
  PermissionCheck("admin"),
  CreatePermission
);
router.delete(
  "/deletepermission",
  ValidatepermissionSchema,
  PermissionCheck("admin"),
  DeletePermission
);

export default router;
