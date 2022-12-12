import sinon from "sinon";
import request from "supertest";
import app from "../app";
import booksQueries from "../db/dbQuerys/bookQuery";

const MockApp = app();

//GET BOOKS REQUEST

describe("test get books data", (): void => {
  let mockquery_fn: sinon.SinonStub<[], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "getAllbooks");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });

  test("check response of get request is successful", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await request(MockApp).get("/api/v1/books");
    expect(response.body).toEqual({
      data: [
        {
          test_data: "test1",
        },
      ],
      message: "books fetched successfully",
      status: "success",
      statusCode: 200,
    });
  });

  test("check if responce is empty throw  error", async () => {
    mockquery_fn.resolves([]);
    const response = await request(MockApp).get("/api/v1/books");
    expect(response.body).toEqual({
      message: "fetching data is failed",
      status: "error",
      statusCode: 404,
    });
  });
});

//SEARCH BOOKS REQUEST

describe("Testing search books request with query", (): void => {
  let mockquery_fn: sinon.SinonStub<[query: string], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "searchBook");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });

  test("check query feild is valid for request", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await request(MockApp).get(
      "/api/v1/books/search/?que=ddan"
    );
    expect(response.body).toEqual({
      message: '"query" is required',
      status: "error",
      statusCode: 400,
    });
  });

  test("check query value min limit is valid for request", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await request(MockApp).get(
      "/api/v1//books/search/?query=dd"
    );
    expect(response.body).toEqual({
      message: '"query" length must be at least 3 characters long',
      status: "error",
      statusCode: 400,
    });
  });
  test("check query value max limit is valid for request", async () => {
    mockquery_fn.resolves([]);
    const response = await request(MockApp).get(
      "/api/v1/books/search/?query=ddandcbdgsjjshfbfcbdhssvcfhfccnsj"
    );
    expect(response.body).toEqual({
      message:
        '"query" length must be less than or equal to 20 characters long',
      status: "error",
      statusCode: 400,
    });
  });

  test("check search result are fetched successfully ", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await request(MockApp).get(
      "/api/v1/books/search/?query=ddandc"
    );
    expect(response.body).toEqual({
      data: [
        {
          test_data: "test1",
        },
      ],
      message: "books fetched successfully",
      status: "success",
      statusCode: 200,
    });
  });
  test("if no search result are found throw error ", async () => {
    mockquery_fn.resolves([]);
    const response = await request(MockApp).get(
      "/api/v1/books/search/?query=ddandc"
    );
    expect(response.body).toEqual({
      message: "no search result",
      status: "error",
      statusCode: 404,
    });
  });
});

//GETSINGLE  BOOK TEST

describe("Testing length of book_id length", (): void => {
  let mockquery_fn: sinon.SinonStub<[query: string], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(booksQueries, "findBook");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });

  test("check search result are fetched successfully ", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await request(MockApp).get("/api/v1/books/");
    expect(response.body).toEqual({
      message: "books fetched successfully",
      status: "success",
      statusCode: 200,
    });
  });
});
