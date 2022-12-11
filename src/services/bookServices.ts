import crypto from "crypto";
import bookQuery from "../db/dbQuerys/bookQuery";
import { NOT_FOUND } from "../utils/errorClass";
import {
  addbookSchema,
  dbBookResponse,
  updatebookSchema,
} from "../types/bookSchemaTypes";

class bookService {
  // get all books from db

  async getAllbooks() {
    const books = await bookQuery.getAllbooks();
    if (books.length > 0) {
      return books;
    }
    throw new NOT_FOUND("books not found");
  }

  // get single books from db with provided book_id

  async getSingleBook(book_id: string) {
    const book = await bookQuery.findBook(book_id);
    if (book === undefined) {
      throw new NOT_FOUND("book not found");
    }
    return book;
  }

  // get books from db with provided Search query

  async searchBook(query: string) {
    return await bookQuery.searchBook(query);
  }

  // add book to db with provided book data

  async addNewBook(bookData: addbookSchema) {
    const lib_book_id = crypto.randomBytes(3).toString("hex");
    return await bookQuery.addNewBook({ ...bookData, lib_book_id });
  }

  // update book in db with provided book fields

  async updateBook(newBookData: updatebookSchema, book_id: string) {
    const isbook = await bookQuery.findBook(book_id);
    if (!isbook) {
      throw new NOT_FOUND("book is not exist");
    }
    return await bookQuery.updateBook(book_id, newBookData);
  }

  // assign book to memeber

  async loanBook(book_id: string, member_id: string) {
    await bookQuery.loanBook({
      book_id,
      member_id,
    });
    return await bookQuery.updateBook(book_id, {
      availablity: false,
    });
  }

  //get all boooks of member with member_id

  async memberBooks(member_id: string) {
    return await bookQuery.memberBooks(member_id);
  }
}

export default new bookService();
