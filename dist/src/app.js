"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middlewares/errorHandler");
const checkUserAccess_1 = require("./middlewares/checkUserAccess");
const authRoutesController_1 = require("./controllers/authRoutesController");
const memberRoutesController_1 = require("./controllers/memberRoutesController");
const adminRoutesController_1 = require("./controllers/adminRoutesController");
const openRoutesController_1 = require("./controllers/openRoutesController");
const pageNotFound_1 = require("./middlewares/pageNotFound");
function myApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)());
    app.use("/api/v1", openRoutesController_1.OpenRoutes);
    app.use("/api/v1/auth", authRoutesController_1.AuthRouter);
    app.use("/api/v1/member", checkUserAccess_1.checkMemberAccess, memberRoutesController_1.MemberRoutes);
    app.use("/api/v1/admin", checkUserAccess_1.checkAdminAccess, adminRoutesController_1.AdminRouter);
    app.use("*", pageNotFound_1.pageNotFound);
    app.use(errorHandler_1.errorHandler);
    return app;
}
exports.default = myApp;
