"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
exports.default = new (class bookQuery {
    // find book is present in db with book_id
    async findBook(id) {
        const data = await (0, connection_1.default)("books").where("book_id", id).returning("*");
        return data;
    }
    // add new book into db
    async addNewBook(payload) {
        return await (0, connection_1.default)("books").insert(payload).returning("*");
    }
    // get all book from db
    async getAllbooks() {
        return await (0, connection_1.default)("books").returning("*");
    }
    //search books with the text query
    async searchBook(query) {
        return await (0, connection_1.default)("books")
            .where(connection_1.default.raw(`(LOWER(books.title)) ILIKE ?`, [`%${query}%`]))
            .orWhere(connection_1.default.raw(`LOWER(books.category) ILIKE ?`, [`%${query}%`]))
            .orWhere(connection_1.default.raw(`LOWER(books.author) ILIKE ?`, [`%${query}%`]))
            .returning("*");
    }
    //update existing book with new data
    async updateBook(book_id, newBookData) {
        return await (0, connection_1.default)("books")
            .update(newBookData)
            .where({ book_id })
            .returning("*");
    }
    // assign book to member create relation
    async loanBook(payload) {
        return await (0, connection_1.default)("member_books").insert(payload).returning("*");
    }
    //find books of specific member with member_id
    async memberBooks(member_id) {
        return await (0, connection_1.default)("member_books")
            .leftJoin("books", "member_books.book_id", "=", "books.book_id")
            .where({ member_id })
            .returning("*");
    }
})();
