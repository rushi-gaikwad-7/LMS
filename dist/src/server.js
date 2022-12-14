"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const server = (0, app_1.default)();
dotenv_1.default.config();
const loggerForSearchbooks = logger_1.logger.child({ reqId: "sjs" }, true);
const APP_PORT = Number(process.env.APP_ENV) || 8000;
const TEST_PORT = Number(process.env.TEST_PORT) || 3300;
const PORT = process.env.NODE_ENV === "test" ? TEST_PORT : APP_PORT;
server.listen(PORT, () => {
    loggerForSearchbooks.info(`Server connected at http://localhost:${PORT}`);
});
