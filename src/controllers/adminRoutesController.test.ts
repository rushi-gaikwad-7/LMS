import request from "supertest";
import sinon from "sinon";
import app from "../app";
import * as jwtMockVerify from "../utils/jwt";

import booksQueries from "../db/dbQuerys/bookQuery";
import memberQueries from "../db/dbQuerys/memberQuery";
const MockApp = app();

describe("test for add new book into db", (): void => {
  let jwtMock: any;
  let mockquery_fn: any;
  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
    mockquery_fn = sinon.stub(booksQueries, "addNewBook");
  });
  afterEach(() => {
    jwtMock.restore();
    mockquery_fn.restore();
  });
  test("throw error if title field is not present in req body", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send()
      .set("Cookie", "access_token=abd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"title" is required',
    });
  });

  test("throw error if title field length is below 3 in req body ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send({ title: "qf" })
      .set("Cookie", "access_token=abd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"title" length must be at least 3 characters long',
    });
  });

  test("throw error if title field length is below 3 in req body ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send({ title: "shdh", author: "263" })
      .set("Cookie", "access_token=abd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message:
        '"author" with value "263" fails to match the Alphanumerics pattern',
    });
  });

  test("throw error if author field is notpresent in req body ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send({ title: "ahshd" })
      .set("Cookie", "access_token=abd");
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"author" is required',
    });
  });

  test("send response after adding book in db ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn.resolves([
      {
        test_data: "test_data",
      },
    ]);
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send({
        title: "string",
        author: "string",
        category: "string",
        publish_year: 1273,
        rating: 2,
        language: "string",
        pages: 23,
        cover: "string",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      data: [],
      message: "book added successfully",
      status: "success",
      statusCode: 201,
    });
  });

  test("throw error if failed to add book  in db ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn.resolves([]);
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .send({
        title: "string",
        author: "string",
        category: "string",
        publish_year: 1273,
        rating: 2,
        language: "string",
        pages: 23,
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: "Unexpected internal server error.",
      status: "error",
      statusCode: 500,
    });
  });
});

//UPDATE BOOK FUNCTION TESTING

describe("Testing length of book_id length", (): void => {
  let jwtMock: any;
  let mockquery_fn1: any;
  let mockquery_fn2: any;
  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
    mockquery_fn1 = sinon.stub(booksQueries, "findBook");
    mockquery_fn2 = sinon.stub(booksQueries, "updateBook");
  });
  afterEach(() => {
    jwtMock.restore();
    mockquery_fn1.restore();
    mockquery_fn2.restore();
  });

  test("check book_id is correct in req params ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([
      {
        test_data: "test1",
      },
    ]);
    mockquery_fn2.resolves([
      {
        test_data: "test2",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/book_id")
      .send({
        title: "string",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: '"book_id" length must be 36 characters long',
      status: "error",
      statusCode: 400,
    });
  });

  test("check uuid as book_id is in correct format or not ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([
      {
        test_data: "test1",
      },
    ]);
    mockquery_fn2.resolves([
      {
        test_data: "test2",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/hfgrebdgsjeyhfrgsbfgryujfhgsvekshdeg")
      .send({
        title: "string",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: '"book_id" must be a valid GUID',
      status: "error",
      statusCode: 400,
    });
  });

  test("throw error if  field for update is not valid schema in req body", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([]);
    mockquery_fn2.resolves([
      {
        test_data: "t",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .send({
        title: "dh",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: '"title" length must be at least 3 characters long',
      status: "error",
      statusCode: 400,
    });
  });

  test("throw error if  field for update is not valid schema in req body", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([]);
    mockquery_fn2.resolves([
      {
        test_data: "t",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .send({
        title: "dasmsdndddkkwkwksxmdedksksaskslsldldssh",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message:
        '"title" length must be less than or equal to 15 characters long',
      status: "error",
      statusCode: 400,
    });
  });

  test("throw error if  book for update is not found in db", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([]);
    mockquery_fn2.resolves([
      {
        test_data: "testdata",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .send({
        title: "damchai",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: "book is not exist",
      status: "error",
      statusCode: 404,
    });
  });

  test("throw error if  book for update is not found in db", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([]);
    mockquery_fn2.resolves([
      {
        test_data: "testdata",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/updatebook/8cc005d6-0ccd-485c-97e8-f212c16f876d")
      .send({
        title: "damchai",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: "book is not exist",
      status: "error",
      statusCode: 404,
    });
  });

  test("send response and data as array of object  if request is fulfiled", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([{ test: "test" }]);
    mockquery_fn2.resolves([
      {
        test_data: "testdata",
      },
    ]);
    const response = await request(MockApp)
      .put("/api/v1/admin/members")
      .send({
        title: "damchai",
      })
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      data: [],
      message: "book updated successfully",
      status: "success",
      statusCode: 200,
    });
  });
});

//TESTING FOR GET ALL MEMBERS DATA

describe("Testing get request for fetching members data", (): void => {
  let jwtMock: any;
  let mockquery_fn1: any;

  beforeEach(() => {
    jwtMock = sinon.stub(jwtMockVerify, "VerifyAccessToken");
    mockquery_fn1 = sinon.stub(memberQueries, "getAllMembers");
  });
  afterEach(() => {
    jwtMock.restore();
    mockquery_fn1.restore();
  });

  test("throw error if db gives empty array of object ", async () => {
    jwtMock.resolves({
      role: "admin",
    });
    mockquery_fn1.resolves([]);
    const response = await request(MockApp)
      .get("/api/v1/admin/updatebook/book_id")
      .set("Cookie", "access_token=abcd");
    expect(response.body).toEqual({
      message: "We could not find the resource you requested.",
      status: "error",
      statusCode: 400,
    });
  });
});
