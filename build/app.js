"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
class ServerInit extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getEnviromentNumber('PORT');
        this.app.use((0, morgan_1.default)('dev'));
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`listening on ${this.port}`);
        });
    }
}
new ServerInit();
