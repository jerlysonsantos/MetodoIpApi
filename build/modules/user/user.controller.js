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
const lead_entity_1 = require("../../database/entity/lead.entity");
const user_entity_1 = require("../../database/entity/user.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
const paginate_1 = __importDefault(require("../../helpers/paginate"));
const success_return_1 = __importDefault(require("../../helpers/success-return"));
class UserController {
    me(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            return _res.send(Object.assign({}, _req.user));
        });
    }
    list(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPaginate = paginate_1.default(_req);
                const getEntity = yield user_entity_1.User.findAndCount(Object.assign({}, getPaginate));
                const users = getEntity[0].map((user) => {
                    delete user.password;
                    return user;
                });
                return success_return_1.default(_req, _res, [users, getEntity[1]]);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    getOne(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                const user = yield user_entity_1.User.findOne({ id });
                if (!user)
                    throw Error('Not found!');
                delete user.password;
                return _res.jsonp(Object.assign({}, user));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    getLead(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                const lead = yield lead_entity_1.Lead.findOne({ id });
                if (!lead)
                    throw Error('Not found!');
                return _res.jsonp(Object.assign({}, lead));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    update(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                delete _req.body.password;
                yield user_entity_1.User.update(id, Object.assign({}, _req.body));
                const user = yield user_entity_1.User.findOne(id);
                if (!user)
                    throw Error('Not found!');
                return _res.jsonp(Object.assign({}, user));
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
                    throw Error('Not found!');
                yield user_entity_1.User.delete(id);
                return _res.jsonp(Object.assign({}, user));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    deleteAll(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_entity_1.User.query('TRUNCATE TABLE "users" CASCADE');
                return _res.jsonp({ message: 'Todos usuários foram apagados' });
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
                const result = yield user_entity_1.User.create(Object.assign({}, body)).save();
                return _res.json({ result });
            }
            catch (err) {
                console.log(err);
                return error_return_1.default(_res, err);
            }
        });
    }
    lead(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = _req.body;
                const result = yield lead_entity_1.Lead.create(Object.assign({}, body)).save();
                return _res.json({ result });
            }
            catch (err) {
                console.log(err);
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map