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
const url_entity_1 = require("../../database/entity/url.entity");
const error_return_1 = __importDefault(require("../../helpers/error-return"));
class UrlController {
    getUrl(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getEntity = yield url_entity_1.Url.findOne();
                return _res.json({ getEntity });
            }
            catch (err) {
                return error_return_1.default(_res, err);
            }
        });
    }
    setUrl(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = _req.body;
                if (!body.id.length) {
                    const result = yield url_entity_1.Url.create(Object.assign({}, body)).save();
                    return _res.json({ result });
                }
                const update = yield url_entity_1.Url.update({ id: body.id }, Object.assign({}, body));
                return _res.json({ update });
            }
            catch (err) {
                console.log(err);
                return error_return_1.default(_res, err);
            }
        });
    }
}
exports.default = new UrlController();
//# sourceMappingURL=url.controller.js.map