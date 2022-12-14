"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authQuery_1 = __importDefault(require("../db/dbQuerys/authQuery"));
const bcrypt_1 = require("../utils/bcrypt");
const errorClass_1 = require("../utils/errorClass");
const jwt_1 = require("../utils/jwt");
class authService {
    //register new member is db
    async addNewMember(body) {
        const { name, password, email, role } = body;
        const member = await authQuery_1.default.findMember(email);
        if (member.length === 0) {
            const hash_key = await (0, bcrypt_1.createHashPassword)(password);
            if (hash_key) {
                return await authQuery_1.default.addNewMember({
                    name,
                    email,
                    hash_key,
                    role,
                });
            }
        }
        throw new errorClass_1.FORBIDDEN("user already exist");
    }
    //login  member with correct credientials
    async login(userData) {
        const { password, email } = userData;
        const member = await authQuery_1.default.findMember(email);
        if (member.length === 0) {
            throw new errorClass_1.NOT_FOUND("user not found");
        }
        const { role, member_id, hash_key } = member[0];
        const verifyPassword = await (0, bcrypt_1.checkPassword)(password, hash_key);
        if (!verifyPassword) {
            throw new errorClass_1.UNAUTHORIZED("invalid password or email");
        }
        const token = await (0, jwt_1.signInAccessToken)({ member_id, email, role });
        return token;
    }
}
exports.default = new authService();
