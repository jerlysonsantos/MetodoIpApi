"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./modules/admin"));
const auth_1 = __importDefault(require("./modules/auth"));
const palestrante_1 = __importDefault(require("./modules/palestrante"));
const question_1 = __importDefault(require("./modules/question"));
const user_1 = __importDefault(require("./modules/user"));
const url_1 = __importDefault(require("./modules/url"));
class App {
    constructor() {
        this.express = express_1.default();
        this.config();
        this.routes();
        this.express.use('/v1', auth_1.default);
        this.express.use('/v1', user_1.default);
        this.express.use('/v1', admin_1.default);
        this.express.use('/v1', question_1.default);
        this.express.use('/v1', palestrante_1.default);
        this.express.use('/v1', url_1.default);
    }
    config() {
        this.express.use(cors_1.default());
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.express.get('/health', (_req, _res) => {
            return _res.json({ health: true });
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=server.js.map