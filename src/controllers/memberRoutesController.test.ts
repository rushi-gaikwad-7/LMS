import request from "supertest";
import sinon from "sinon";
import app from "../app";
import * as jwtMockVerify from "../utils/jwt";
import booksQueries from "../db/dbQuerys/bookQuery";
const MockApp = app();

describe("test for chech member access", (): void => {
  let jwtMock: any;
  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
  });
  afterEach(() => {
    jwtMock.restore();
  });
  test("throw error if user is not logged In", async () => {
    jwtMock.resolves({
      role: "",
    });
    const response = await request(MockApp).post("/api/v1/member/books").send();
    expect(response.body).toEqual({
      status: "error",
      statusCode: 401,
      message: "please login to access",
    });
  });
  test("throw error if user is not a admin In", async () => {
    jwtMock.resolves({
      role: "",
    });
    const response = await request(MockApp)
      .post("/api/v1/member/books")
      .send()
      .set("Cookie", "access_token=abd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 403,
      message: "access denied",
    });
  });
});

//LOAN BOOK FUNCTION TESTING

describe("test for loan book to member ", (): void => {
  let jwtMock: any;
  let mockquery_fn1: any;
  let mockquery_fn2: any;
  let mockquery_fn3: any;
  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
    mockquery_fn1 = sinon.stub(booksQueries, "findBook");
    mockquery_fn2 = sinon.stub(booksQueries, "loanBook");
    mockquery_fn3 = sinon.stub(booksQueries, "updateBook");
  });
  afterEach(() => {
    jwtMock.restore();
    mockquery_fn1.restore();
    mockquery_fn2.restore();
    mockquery_fn3.restore();
  });
  test("throw error if title field is not present in req body", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    const response = await request(MockApp)
      .post("/api/v1/member/loanbook/:bj")
      .set("Cookie", "access_token=abcd");

    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"book_id" length must be 36 characters long',
    });
  });

  test("throw error if title field is not present in req body", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    const response = await request(MockApp)
      .post("/api/v1/member/loanbook/hfgrebdgsjeyhfrgsbfgryujfhgsvekshdeg")
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"book_id" must be a valid GUID',
    });
  });

  test("if book is alredy loanded throw error", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    mockquery_fn1.resolves([
      {
        availablity: false,
      },
    ]);
    mockquery_fn2.resolves([
      {
        test: "test",
      },
    ]);
    mockquery_fn3.resolves([
      {
        test: "test",
      },
    ]);
    const response = await request(MockApp)
      .post("/api/v1/member/loanbook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 404,
      message: "book is not avilable to loan",
    });
  });

  test("if book is not  loanded assign to new member ", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    mockquery_fn1.resolves([
      {
        availablity: true,
      },
    ]);
    mockquery_fn2.resolves([
      {
        test: "test",
      },
    ]);
    mockquery_fn3.resolves([
      {
        test: "test",
      },
    ]);
    const response = await request(MockApp)
      .post("/api/v1/member/loanbook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      data: [
        {
          test: "test",
        },
      ],
      message: "book loaned successfully 😊 👌",
      status: "success",
      statusCode: 201,
    });
  });
});

//GET MEMBER BOOKS FUNCTION TESTING

describe("test for fetching  books of logged in member ", (): void => {
  let jwtMock: any;
  let mockquery_fn: any;
  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
    mockquery_fn = sinon.stub(booksQueries, "memberBooks");
  });
  afterEach(() => {
    jwtMock.restore();
    mockquery_fn.restore();
  });
  test("throw error if title field is not present in req body", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    mockquery_fn.resolves([{ test: "test" }]);
    const response = await request(MockApp)
      .get("/api/v1/member/books")
      .set("Cookie", "access_token=abcd");

    expect(response.body).toEqual({
      data: [
        {
          test: "test",
        },
      ],
      message: "books fetched successfully",
      status: "success",
      statusCode: 200,
    });
  });

  test("throw error if title field is not present in req body", async () => {
    jwtMock.resolves({
      role: "member",
      member_id: "xyzshd",
    });
    mockquery_fn.resolves([]);
    const response = await request(MockApp)
      .get("/api/v1/member/books")
      .set("Cookie", "access_token=abcd");

    expect(response.body).toEqual({
      message: "fetching data is failed",
      status: "error",
      statusCode: 404,
    });
  });
});
