import booksQueries from "../db/dbQuerys/bookQuery";
import bookServices from "../services/bookServices";
import sinon from "sinon";

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
  test("if book fetched successfully from db send array of object", async () => {
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

  test("if books data is empty in db send empty array of object", async () => {
    try {
      mockquery_fn.resolves([{}]);
      await bookServices.getSingleBook("xyz");
    } catch (error: any) {
      expect(error.message).toEqual(
        "We could not find the resource you requested."
      );
    }
  });
});

//SEARCHBOOK FUNCTION TESTING



