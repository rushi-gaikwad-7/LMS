import db from "../connection";
import { bookSchema } from "../../types/bookSchemaTypes";

export default new (class bookQuery {
  // find book is present in db with book_id

  async findBook(id: string) {
    const data = await db("books").where("book_id", id).returning("*");
    return data;
  }

  // add new book into db

  async addNewBook(payload: bookSchema) {
    return await db("books").insert(payload).returning("*");
  }

  // get all book from db

  async getAllbooks() {
    return await db("books").returning("*");
  }

  //search books with the text query

  async searchBook(query: any) {
    return await db("books")
      .where(db.raw(`(LOWER(books.title)) ILIKE ?`, [`%${query}%`]))
      .orWhere(db.raw(`LOWER(books.category) ILIKE ?`, [`%${query}%`]))
      .orWhere(db.raw(`LOWER(books.author) ILIKE ?`, [`%${query}%`]))
      .returning("*");
  }

  //update existing book with new data

  async updateBook(book_id: string, newBookData: any) {
    return await db("books")
      .update(newBookData)
      .where({ book_id })
      .returning("*");
  }

  // assign book to member create relation
  async loanBook(payload: any) {
    return await db("member_books").insert(payload).returning("*");
  }

  //find books of specific member with member_id

  async memberBooks(member_id: string) {
    return await db("member_books")
      .leftJoin("books", "member_books.book_id", "=", "books.book_id")
      .where({ member_id })
      .returning("*");
  }
})();
