import booksQueries from "../db/dbQuerys/bookQuery";
import bookServices from "../services/bookServices";
import sinon from "sinon";
import {
  addbookSchema,
  bookSchema,
  updatebookSchema,
} from "../types/bookSchemaTypes";

/// GETALLBOOKS FUNCTION TESTING

describe("Testing for fething  books data", () => {
  let mockquery_fn: sinon.SinonStub<[], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "getAllbooks");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });
  test("if books fetched successfully from db send array of object", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await bookServices.getAllbooks();
    expect(response).toEqual([
      {
        test_data: "test1",
      },
    ]);
  });

  test("if books data is empty in db send empty array of object", async () => {
    try {
      mockquery_fn.resolves([{}]);
      await bookServices.getAllbooks();
    } catch (error: any) {
      expect(error.message).toEqual(
        "We could not find the resource you requested."
      );
    }
  });
});

// GETSINGLEBOOK FUNCTION TESTING

describe("Testing for fething single book data", () => {
  let mockquery_fn: sinon.SinonStub<[book_id: string], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "findBook");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });
  test("if book fetched successfully from db send array object", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await bookServices.getSingleBook("xyz");
    expect(response).toEqual([
      {
        test_data: "test1",
      },
    ]);
  });

  test("if book data is empty in db send empty array", async () => {
    try {
      mockquery_fn.resolves([]);
      await bookServices.getSingleBook("xyz");
    } catch (error: any) {
      expect(error.message).toEqual(
        "We could not find the resource you requested."
      );
    }
  });
});

//SEARCHBOOK FUNCTION TESTING

describe("Testing for  searching  books data with input query", () => {
  let mockquery_fn: sinon.SinonStub<[query: string], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "searchBook");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });
  test("if books searched successfully from db send array of object", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await bookServices.searchBook("xyz");
    expect(response).toEqual([
      {
        test_data: "test1",
      },
    ]);
  });

  test("if books data is empty in db send empty array", async () => {
    try {
      mockquery_fn.resolves([]);
      await bookServices.searchBook("xyz");
    } catch (error: any) {
      expect(error.message).toEqual(
        "We could not find the resource you requested."
      );
    }
  });
});

//ADDNEWBOOK FUNCTION TESTING

describe("Testing for adding new book into db", () => {
  let mockquery_fn: sinon.SinonStub<[bookData: bookSchema], Promise<unknown[]>>;
  const mock_test_data: addbookSchema = {
    title: "string",
    author: "string",
    category: "string",
    publish_year: 1998,
    rating: 3,
    language: "string",
    pages: 123,
    cover: "string",
  };
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "addNewBook");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });
  test("if book added successfully from db send array of object", async () => {
    mockquery_fn.resolves([mock_test_data]);
    const response = await bookServices.addNewBook(mock_test_data);
    expect(response).toEqual([mock_test_data]);
  });
});

//UPDATEBOOK FUNCTION TESTING

describe("Testing for updating  book data", () => {
  let mockquery_fn1: sinon.SinonStub<[query: string], Promise<unknown[]>>;
  let mockquery_fn2: sinon.SinonStub<
    [book_id: string, newBookData: updatebookSchema],
    Promise<unknown[]>
  >;
  beforeEach(() => {
    mockquery_fn1 = sinon.stub(booksQueries, "findBook");
    mockquery_fn2 = sinon.stub(booksQueries, "updateBook");
  });
  afterEach(() => {
    mockquery_fn1.restore();
    mockquery_fn2.restore();
  });
  test("if book is not present in db send undefined from db", async () => {
    mockquery_fn1.resolves([]);
    try {
      await bookServices.updateBook("xyz", {
        title: "",
        author: "",
        category: "",
        publish_year: 0,
        rating: 0,
        lib_book_id: "",
        language: "",
        pages: 0,
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "We could not find the resource you requested."
      );
    }
  });

  test("if book updated in db send array of object", async () => {
    mockquery_fn1.resolves([
      {
        title: "",
        author: "",
        category: "",
        publish_year: 0,
        rating: 0,
        lib_book_id: "",
        language: "",
        pages: 0,
      },
    ]);

    mockquery_fn2.resolves([{ test_data: "test" }]);

    const response = await bookServices.updateBook("xyz", {
      title: "",
      author: "",
      category: "",
      publish_year: 0,
      rating: 0,
      lib_book_id: "",
      language: "",
      pages: 0,
    });

    expect(response).toEqual([{ test_data: "test" }]);
  });
});
