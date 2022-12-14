"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format_1 = __importDefault(require("bunyan-format"));
const formatOut = (0, bunyan_format_1.default)({ outputMode: "short" });
exports.logger = bunyan_1.default.createLogger({
    name: "LMS",
    serializers: {
        err: bunyan_1.default.stdSerializers.err,
        res: bunyan_1.default.stdSerializers.res,
        req: bunyan_1.default.stdSerializers.req,
    },
    stream: formatOut,
    level: "info",
});
//prevents logs while testing
if (process.env.NODE_ENV === "test") {
    exports.logger.level(bunyan_1.default.FATAL + 1);
}
