import bookQuery from "../db/dbQuerys/bookQuery";
import { IINTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/errorClass";
import {
  addbookSchema,
  dbBookResponse,
  updatebookSchema,
} from "../types/bookSchemaTypes";
import { randomString } from "../utils/cryptoRandom";

class bookService {
  // get all books from db

  async getAllbooks() {
    const books = await bookQuery.getAllbooks();
    if (books.length === 0) {
      throw new NOT_FOUND("fetching data is failed");
    }
    return books;
  }

  // get single books from db with provided book_id

  async getSingleBook(book_id: string) {
    const book = await bookQuery.findBook(book_id);
    if (book.length === 0) {
      const error = new NOT_FOUND("book is not exist");
      throw error;
    }
    return book;
  }

  // get books from db with provided Search query

  async searchBook(query: any) {
    const books = await bookQuery.searchBook(query);
    if (books.length === 0) {
      throw new NOT_FOUND("no search result");
    }
    return books;
  }

  // add book to db with provided book data

  async addNewBook(bookData: addbookSchema) {
    const lib_book_id = await randomString();
    const newBook = await bookQuery.addNewBook({ ...bookData, lib_book_id });
    if (newBook.length === 0) {
      throw new IINTERNAL_SERVER_ERROR();
    }
    return newBook;
  }

  // update book in db with provided book fields

  async updateBook(book_id: string, newBookData: updatebookSchema) {
    const isbook = await bookQuery.findBook(book_id);
    if (isbook.length == 0) {
      throw new NOT_FOUND("book is not exist");
    }
    return await bookQuery.updateBook(book_id, newBookData);
  }

  // assign book to memeber

  async loanBook(book_id: string, member_id: string) {
    const book: dbBookResponse[] = await bookQuery.findBook(book_id);
    if (book.length === 0) {
      throw new NOT_FOUND("book not found");
    }
    if (!book[0].availablity) {
      throw new NOT_FOUND("book is not avilable to loan");
    } else {
      await bookQuery.loanBook({
        book_id,
        member_id,
      });
      return await bookQuery.updateBook(book_id, {
        availablity: false,
      });
    }
  }

  //get all boooks of member with member_id

  async memberBooks(member_id: string) {
    const books = await bookQuery.memberBooks(member_id);
    if (books.length === 0) {
      throw new NOT_FOUND("fetching data is failed");
    }
    return books;
  }
}

export default new bookService();
