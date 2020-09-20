"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("./admin.controller"));
const router = express_1.Router();
router.post("/admin/login", admin_controller_1.default.login);
router.post("/admin/create", admin_controller_1.default.create);
router.delete("/admin/delete/:id", admin_controller_1.default.delete);
router.get("/admin/all", admin_controller_1.default.index);
router.put("/admin/:id", admin_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=index.js.map