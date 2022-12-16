import request from "supertest";
import sinon from "sinon";
import app from "../app";
import * as jwtMockVerify from "../utils/jwt";
import * as bcrptMock from "../utils/bcrypt";
import authQuery from "../db/dbQuerys/authQuery";

const MockApp = app();

describe("test for add new book into db", (): void => {
  let mockquery_fn1: any;
  let mockquery_fn2: any;
  let mockquery_fn3: any;
  beforeEach(() => {
    mockquery_fn1 = sinon.stub(authQuery, "findMember");
    mockquery_fn2 = sinon.stub(bcrptMock, "createHashPassword");
    mockquery_fn3 = sinon.stub(authQuery, "addNewMember");
  });
  afterEach(() => {
    mockquery_fn1.restore();
    mockquery_fn2.restore();
    mockquery_fn3.restore();
  });
  test("check req body for register is valid schema or not", async () => {
    const response = await request(MockApp)
      .post("/api/v1/auth/register")
      .send({});
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"name" is required',
    });
  });

  test("check user is alredy present throw error", async () => {
    mockquery_fn1.resolves([
      {
        test: "test",
      },
    ]);
    const response = await request(MockApp).post("/api/v1/auth/register").send({
      name: "string",
      email: "email@gmail.com",
      password: "string",
      role: "string",
    });
    expect(response.body).toEqual({
      status: "error",
      statusCode: 403,
      message: "user already exist",
    });
  });

  test("check user is alredy present throw error", async () => {
    mockquery_fn1.resolves([]);
    mockquery_fn2.resolves("random");
    mockquery_fn3.resolves([{ test: "test" }]);
    const response = await request(MockApp).post("/api/v1/auth/register").send({
      name: "string",
      email: "email@gmail.com",
      password: "string",
      role: "string",
    });
    expect(response.body).toEqual({
      data: [],
      message: "member added successfully",
      status: "success",
      statusCode: 201,
    });
  });
});

//LOGIN FUNCTION TESTTING

describe("test for login user route", (): void => {
  let mockquery_fn1: any;
  let mockquery_fn2: any;
  let mockquery_fn3: any;
  beforeEach(() => {
    mockquery_fn1 = sinon.stub(authQuery, "findMember");
    mockquery_fn2 = sinon.stub(bcrptMock, "checkPassword");
    mockquery_fn3 = sinon.stub(jwtMockVerify, "signInAccessToken");
  });
  afterEach(() => {
    mockquery_fn1.restore();
    mockquery_fn2.restore();
    mockquery_fn3.restore();
  });
  test("check req body for login is valid schema or not", async () => {
    const response = await request(MockApp).post("/api/v1/auth/login").send({});
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: '"email" is required',
    });
  });

  test("check user is  present or not ", async () => {
    mockquery_fn1.resolves([]);
    const response = await request(MockApp)
      .post("/api/v1/auth/login")
      .send({ email: "email@gmail.com", password: "string" });
    expect(response.body).toEqual({
      status: "error",
      statusCode: 404,
      message: "user not found",
    });
  });

  test("check paasword  is valid or not present or not ", async () => {
    mockquery_fn1.resolves([
      {
        test: "test",
      },
    ]);
    mockquery_fn2.resolves(false);
    mockquery_fn3.resolves([]);
    const response = await request(MockApp)
      .post("/api/v1/auth/login")
      .send({ email: "email@gmail.com", password: "string" });
    expect(response.body).toEqual({
      status: "error",
      statusCode: 401,
      message: "invalid password or email",
    });
  });

  test("check paasword  is valid or not present or not ", async () => {
    mockquery_fn1.resolves([
      {
        test: "test",
      },
    ]);
    mockquery_fn2.resolves(true);
    mockquery_fn3.resolves([{ test: "test" }]);
    const response = await request(MockApp)
      .post("/api/v1/auth/login")
      .send({ email: "email@gmail.com", password: "string" });
    expect(response.body).toEqual({
      data: [],
      message: "Logged in successfully",
      status: "success",
      statusCode: 200,
    });
  });
});
