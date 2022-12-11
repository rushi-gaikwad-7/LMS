"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bookQuery_1 = __importDefault(require("../db/dbQuerys/bookQuery"));
const errorClass_1 = require("../utils/errorClass");
class bookService {
    // get all books from db
    async getAllbooks() {
        const books = await bookQuery_1.default.getAllbooks();
        if (books.length > 0) {
            return books;
        }
        throw new errorClass_1.NOT_FOUND("books not found");
    }
    // get single books from db with provided book_id
    async getSingleBook(book_id) {
        const book = await bookQuery_1.default.findBook(book_id);
        if (book === undefined) {
            throw new errorClass_1.NOT_FOUND("book not found");
        }
        return book;
    }
    // get books from db with provided Search query
    async searchBook(query) {
        return await bookQuery_1.default.searchBook(query);
    }
    // add book to db with provided book data
    async addNewBook(bookData) {
        const lib_book_id = crypto_1.default.randomBytes(3).toString("hex");
        return await bookQuery_1.default.addNewBook({ ...bookData, lib_book_id });
    }
    // update book in db with provided book fields
    async updateBook(newBookData, book_id) {
        const isbook = await bookQuery_1.default.findBook(book_id);
        if (!isbook) {
            throw new errorClass_1.NOT_FOUND("book is not exist");
        }
        return await bookQuery_1.default.updateBook(book_id, newBookData);
    }
    // assign book to memeber
    async loanBook(book_id, member_id) {
        await bookQuery_1.default.loanBook({
            book_id,
            member_id,
        });
        return await bookQuery_1.default.updateBook(book_id, {
            availablity: false,
        });
    }
    //get all boooks of member with member_id
    async memberBooks(member_id) {
        return await bookQuery_1.default.memberBooks(member_id);
    }
}
exports.default = new bookService();
