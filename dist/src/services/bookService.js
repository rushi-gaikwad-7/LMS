"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bookQuery_1 = __importDefault(require("../db/dbQuerys/bookQuery"));
const errorClass_1 = require("../utils/errorClass");
class bookService {
    async addNewBook(req) {
        const lib_book_id = crypto_1.default.randomBytes(3).toString("hex");
        return await bookQuery_1.default.addNewBook({ ...req.body, lib_book_id });
    }
    async getAllbooks() {
        return await bookQuery_1.default.getAllbooks();
    }
    async getSingleBook(req) {
        const { book_id } = req.params;
        return await bookQuery_1.default.findBook(book_id);
    }
    async searchBook(req) {
        console.log(req.query);
        const { query } = req.query;
        console.log(query);
        return await bookQuery_1.default.searchBook(query);
    }
    async updateBook(req) {
        const { book_id } = req.params;
        const isbook = await bookQuery_1.default.findBook(book_id);
        if (!isbook) {
            throw new errorClass_1.NOT_FOUND("book is not exist");
        }
        const newBookData = req.body;
        return await bookQuery_1.default.updateBook(book_id, newBookData);
    }
    async loanBook(req) {
        const { book_id, member_id } = req.body;
        await bookQuery_1.default.loanBook({
            book_id,
            member_id,
        });
        return await bookQuery_1.default.updateBook(book_id, {
            availablity: false,
        });
    }
    async memberBooks(req) {
        const { member_id } = req.params;
        return await bookQuery_1.default.memberBooks(member_id);
    }
}
exports.default = new bookService();
