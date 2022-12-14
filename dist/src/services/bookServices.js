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
    async getAllbooks(loggerForSearchbooks) {
        const books = await bookQuery_1.default.getAllbooks();
        if (books.length === 0) {
            throw new errorClass_1.NOT_FOUND("fetching data is failed");
        }
        loggerForSearchbooks === null || loggerForSearchbooks === void 0 ? void 0 : loggerForSearchbooks.error("logged in service");
        return books;
    }
    // get single books from db with provided book_id
    async getSingleBook(book_id, loggerForSearchbooks) {
        const book = await bookQuery_1.default.findBook(book_id);
        if (book.length === 0) {
            const error = new errorClass_1.NOT_FOUND("book is not exist");
            loggerForSearchbooks === null || loggerForSearchbooks === void 0 ? void 0 : loggerForSearchbooks.error({ err: error });
            throw error;
        }
        loggerForSearchbooks === null || loggerForSearchbooks === void 0 ? void 0 : loggerForSearchbooks.info({ message: "books fetched from db" });
        return book;
    }
    // get books from db with provided Search query
    async searchBook(query, loggerForSearchbooks) {
        const books = await bookQuery_1.default.searchBook(query);
        if (books.length === 0) {
            throw new errorClass_1.NOT_FOUND("no search result");
        }
        return books;
    }
    // add book to db with provided book data
    async addNewBook(bookData) {
        const lib_book_id = crypto_1.default.randomBytes(3).toString("hex");
        const newBook = await bookQuery_1.default.addNewBook({ ...bookData, lib_book_id });
        if (newBook.length === 0) {
            throw new errorClass_1.IINTERNAL_SERVER_ERROR();
        }
        return newBook;
    }
    // update book in db with provided book fields
    async updateBook(book_id, newBookData) {
        const isbook = await bookQuery_1.default.findBook(book_id);
        if (isbook.length == 0) {
            throw new errorClass_1.NOT_FOUND("book is not exist");
        }
        return await bookQuery_1.default.updateBook(book_id, newBookData);
    }
    // assign book to memeber
    async loanBook(book_id, member_id) {
        const book = await bookQuery_1.default.findBook(book_id);
        if (book.length === 0) {
            throw new errorClass_1.NOT_FOUND("book not found");
        }
        if (!book[0].availablity) {
            throw new errorClass_1.NOT_FOUND("book is not avilable to loan");
        }
        else {
            await bookQuery_1.default.loanBook({
                book_id,
                member_id,
            });
            return await bookQuery_1.default.updateBook(book_id, {
                availablity: false,
            });
        }
    }
    //get all boooks of member with member_id
    async memberBooks(member_id) {
        const books = await bookQuery_1.default.memberBooks(member_id);
        if (books.length === 0) {
            throw new errorClass_1.NOT_FOUND("fetching data is failed");
        }
        return books;
    }
}
exports.default = new bookService();
