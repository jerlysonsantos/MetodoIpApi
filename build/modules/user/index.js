"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.Router();
router.get('/me', user_controller_1.default.me);
router.post('/register', user_controller_1.default.create);
router.post('/lead', user_controller_1.default.lead);
router.get('/lead/:id', user_controller_1.default.getLead);
router.get('/user', user_controller_1.default.list);
router.get('/user/:id', user_controller_1.default.getOne);
router.put('/user/:id', user_controller_1.default.update);
router.delete('/user/:id', user_controller_1.default.delete);
router.delete('/deleteAll', user_controller_1.default.deleteAll);
exports.default = router;
//# sourceMappingURL=index.js.map