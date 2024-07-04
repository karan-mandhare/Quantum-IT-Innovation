import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getSpecificEmployee,
  updateEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/create", verifyJWT, upload.single("photo"), createEmployee);
router.delete("/delete/:id", verifyJWT, deleteEmployee);
router.put("/update/:id", verifyJWT, updateEmployee);
router.get("/get", verifyJWT, getAllEmployee);
router.get("/get/:id", verifyJWT, getSpecificEmployee);

export default router;
