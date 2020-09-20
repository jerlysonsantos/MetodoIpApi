"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const palestrante_controller_1 = __importDefault(require("./palestrante.controller"));
const router = express_1.Router();
router.post('/palestrante', auth_middleware_1.default, palestrante_controller_1.default.create);
router.get('/palestrante', auth_middleware_1.default, palestrante_controller_1.default.list);
router.put('/palestrante/:id', palestrante_controller_1.default.update);
router.delete('/palestrante/:id', palestrante_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=index.js.map