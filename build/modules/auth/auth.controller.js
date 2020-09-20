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
const user_entity_1 = require("../../database/entity/user.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
class AuthController {
    login(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = _req.body;
                const user = yield user_entity_1.User.findOne({
                    where: { email },
                    order: { created_at: 'DESC' },
                });
                if (!user)
                    return _res.status(401).json({ error: 'Usuário não encontrado!' });
                if (user.token)
                    return _res.status(401).json({ error: 'Usuário já está em uma sessão' });
                const isAuth = yield bcrypt_1.default.compare(password, user.password);
                if (!isAuth)
                    return _res.status(401).json({ error: 'Senha incorreta!' });
                delete user.password;
                if (!process.env.JWT_SECRET)
                    return _res.status(500).json({ error: 'Ops! Ocorreu um erro, tente novamente mais tarde.' });
                const token = yield jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.JWT_SECRET);
                const id = user.id.toString();
                yield user_entity_1.User.update(id, { token });
                return _res.json({ token, user });
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    getAllUsers(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_entity_1.User.find();
                if (!users)
                    return _res.status(401).json({ error: 'Usuário não encontrado!' });
                return _res.json({ users });
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    checkToken(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = _req.headers;
                const user = yield user_entity_1.User.findOne({
                    where: { token: authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1] },
                    order: { created_at: 'DESC' },
                });
                if (!user)
                    return _res.status(401).json({ error: 'Sessão invalida!' });
                return _res.json({ message: true });
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
                const user = yield user_entity_1.User.findOne(id);
                if (!user)
                    throw Error("Not found!");
                yield user_entity_1.User.delete(id);
                return _res.jsonp(Object.assign({}, user));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map