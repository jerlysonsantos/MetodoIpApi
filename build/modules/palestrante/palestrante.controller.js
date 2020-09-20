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
const palestrante_entity_1 = require("../../database/entity/palestrante.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
const success_return_1 = __importDefault(require("../../helpers/success-return"));
class PalestranteController {
    list(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getEntity = yield palestrante_entity_1.Palestrante.findAndCount({
                    order: { created_at: "DESC" },
                });
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
                const palestrante = yield palestrante_entity_1.Palestrante.findOne(id);
                if (!palestrante)
                    throw Error("Not found!");
                yield palestrante_entity_1.Palestrante.delete(id);
                return _res.jsonp(Object.assign({}, palestrante));
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
                const result = yield palestrante_entity_1.Palestrante.create(Object.assign({}, body)).save();
                return _res.json({ result });
            }
            catch (err) {
                console.log(err);
                return error_return_1.default(_res, err);
            }
        });
    }
    update(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = _req.params;
                const body = _req.body;
                const palestrante = yield palestrante_entity_1.Palestrante.findOne(id);
                if (!palestrante)
                    throw Error("Not found!");
                const result = yield palestrante_entity_1.Palestrante.update(id, Object.assign({}, body));
                return _res.jsonp(result);
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new PalestranteController();
//# sourceMappingURL=palestrante.controller.js.map