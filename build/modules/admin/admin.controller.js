"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_entity_1 = require("../../database/entity/admin.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
class AdminController {
    index(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield admin_entity_1.Admins.find({
                    select: ["id", "name", "email", "can_answer", "can_reply", "can_users", "can_chatMod"],
                    order: {
                        created_at: "ASC",
                    },
                });
                return _res.json(admins);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    create(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = _req.body;
                const { email } = body;
                const find = yield admin_entity_1.Admins.findOne({
                    where: { email },
                });
                if (find) {
                    return _res.status(401).json({
                        error: "E-mail já cadastrado",
                    });
                }
                const admin = yield admin_entity_1.Admins.create(Object.assign({}, body)).save();
                return _res.json(admin);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    update(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = _req.body;
                const { id } = _req.params;
                const find = yield admin_entity_1.Admins.findOne({
                    where: { id },
                });
                if (!find) {
                    return _res.status(401).json({
                        error: "Admin não encontrado",
                    });
                }
                const admin = yield admin_entity_1.Admins.update(id, Object.assign({}, body));
                return _res.json(admin);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    delete(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                const admin = yield admin_entity_1.Admins.findOne(id);
                if (!admin)
                    throw Error("Not found!");
                yield admin_entity_1.Admins.delete(id);
                return _res.jsonp(Object.assign({}, admin));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    login(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = _req.body;
                const user = yield admin_entity_1.Admins.findOne({
                    where: { email },
                    order: { created_at: "DESC" },
                });
                if (!user)
                    return _res.status(401).json({ error: "Usuário não encontrado!" });
                const isAuth = yield bcrypt_1.default.compare(password, user.password);
                if (!isAuth)
                    return _res.status(401).json({ error: "Senha incorreta!" });
                delete user.password;
                if (!process.env.JWT_SECRET)
                    return _res
                        .status(500)
                        .json({ error: "Ops! Ocorreu um erro, tente novamente mais tarde." });
                const token = yield jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.JWT_SECRET);
                return _res.json({ token, user });
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new AdminController();
//# sourceMappingURL=admin.controller.js.map