import { Router } from "express";
import AdminController from "./admin.controller";

const router = Router();

router.post("/admin/login", AdminController.login);
router.post("/admin/create", AdminController.create);
router.delete("/admin/delete/:id", AdminController.delete);
router.get("/admin/all", AdminController.index);
router.put("/admin/:id", AdminController.update);

export default router;
