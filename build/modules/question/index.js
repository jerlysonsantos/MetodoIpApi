"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const question_controller_1 = __importDefault(require("./question.controller"));
const router = express_1.Router();
router.post('/question', auth_middleware_1.default, question_controller_1.default.create);
router.get('/question', auth_middleware_1.default, question_controller_1.default.list);
router.get('/question/all', question_controller_1.default.listAll);
router.get('/question/select/:id', question_controller_1.default.select);
router.put('/question/:id', question_controller_1.default.update);
router.delete('/question/:id', question_controller_1.default.delete);
router.get('/rate/:rate', auth_middleware_1.default, question_controller_1.default.rate);
router.get('/rate', auth_middleware_1.default, question_controller_1.default.getRate);
exports.default = router;
//# sourceMappingURL=index.js.map