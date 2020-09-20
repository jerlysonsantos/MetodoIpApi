"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.Router();
router.post('/auth/login', auth_controller_1.default.login);
router.get('/auth/getAllUsers', auth_middleware_1.default, auth_controller_1.default.getAllUsers);
router.delete('/auth/delete/:id', auth_middleware_1.default, auth_controller_1.default.delete);
router.post('/auth/checkToken', auth_middleware_1.default, auth_controller_1.default.checkToken);
exports.default = router;
//# sourceMappingURL=index.js.map