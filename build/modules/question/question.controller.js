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
const question_entity_1 = require("../../database/entity/question.entity");
const user_entity_1 = require("../../database/entity/user.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
const paginate_1 = __importDefault(require("../../helpers/paginate"));
const success_return_1 = __importDefault(require("../../helpers/success-return"));
class QuestionController {
    list(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPaginate = paginate_1.default(_req);
                const getEntity = yield question_entity_1.Question.findAndCount(Object.assign(Object.assign({}, getPaginate), { where: { user: _req.user }, order: { created_at: "DESC" } }));
                return success_return_1.default(_req, _res, [getEntity[0], getEntity[1]]);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    listAll(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPaginate = paginate_1.default(_req);
                const where = { is_active: true };
                if (_req.query.selected)
                    where.selected = _req.query.selected;
                if (_req.query.toPablo)
                    where.selectedToPablo = _req.query.toPablo;
                const getEntity = yield question_entity_1.Question.findAndCount(Object.assign(Object.assign({}, getPaginate), { where, relations: ["user"], order: { created_at: "DESC" } }));
                return success_return_1.default(_req, _res, [getEntity[0], getEntity[1]]);
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
                const question = yield question_entity_1.Question.findOne(id);
                if (!question)
                    throw Error("Not found!");
                yield question_entity_1.Question.delete(id);
                return _res.jsonp(Object.assign({}, question));
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
                const result = yield question_entity_1.Question.create(Object.assign(Object.assign({}, body), { user: _req.user })).save();
                return _res.json({ result });
            }
            catch (err) {
                console.log(err);
                return error_return_1.default(_res, err);
            }
        });
    }
    select(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                const question = yield question_entity_1.Question.findOne(id);
                if (!question)
                    throw Error("Not found!");
                yield question_entity_1.Question.update(id, { selected: !question.selected });
                return _res.jsonp({ id, selected: !question.selected });
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
                const body = _req.body;
                const question = yield question_entity_1.Question.findOne(id);
                if (!question)
                    throw Error("Not found!");
                const result = yield question_entity_1.Question.update(id, Object.assign({}, body));
                return _res.jsonp(result);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    rate(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rate } = _req.params;
                const user = yield user_entity_1.User.update(_req.user.id, { rate });
                return _res.jsonp(Object.assign({}, user));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    getRate(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return _res.jsonp(Object.assign({}, _req.user));
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new QuestionController();
//# sourceMappingURL=question.controller.js.map