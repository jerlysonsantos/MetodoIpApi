"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
const serverStart = http_1.default.createServer(server_1.default);
dotenv_1.config();
database_1.default().then(() => {
    const PORT = 3079;
    serverStart.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
}).catch((error) => console.log(error));
//# sourceMappingURL=index.js.map