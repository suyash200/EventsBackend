import { Router } from "express";
import DeleteCategory, {
  createCategory,
} from "../controllers/category.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";

const router = Router();

router.post("/createcategory", PermissionCheck("admin"), createCategory);
router.delete("/deletecategory", PermissionCheck("admin"), DeleteCategory);
export default router;
