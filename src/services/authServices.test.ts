import authQueries from "../db/dbQuerys/authQuery";
import authServices from "../services/authServices";

import sinon from "sinon";
import * as passwordMock from "../utils/bcrypt";
import * as jwtMock from "../utils/jwt";
/// ADDNEWMEMBER FUNCTION TESTING

describe("Testing for adding new member data", () => {
  let mockquery_fn1: sinon.SinonStub<[email: string], Promise<unknown[]>>;

  let mockquery_fn2: sinon.SinonStub<[payload: any], Promise<unknown[]>>;
  let mockquery_fn3: any;
  beforeEach(() => {
    mockquery_fn1 = sinon.stub(authQueries, "findMember");
    mockquery_fn2 = sinon.stub(authQueries, "addNewMember");
    mockquery_fn3 = sinon.stub(passwordMock, "createHashPassword");
  });
  afterEach(() => {
    mockquery_fn1.restore();
    mockquery_fn2.restore();
    mockquery_fn3.restore();
  });
  test("if member is already present in data base throw error", async () => {
    mockquery_fn1.resolves([
      {
        test_data: "test1",
      },
    ]);
    try {
      await authServices.addNewMember({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      expect(error.message).toEqual("user already exist");
    }
  });

  test("check adding member to db is success or not", async () => {
    mockquery_fn3.resolves("sdjdjcncdd");
    mockquery_fn2.resolves([
      {
        test_data: "test1",
      },
    ]);

    const res = await authServices.addNewMember({
      name: "",
      email: "",
      password: "",
    });
    expect(res).toEqual([
      {
        test_data: "test1",
      },
    ]);
  });
});

//TESTING FOR LOGININ FUNCTION

describe("Testing the login member service", () => {
  let mockquery_fn1: sinon.SinonStub<[email: string], Promise<unknown[]>>;
  let mockquery_fn2: any;
  let mockquery_fn3: any;
  beforeEach(() => {
    mockquery_fn1 = sinon.stub(authQueries, "findMember");
    mockquery_fn2 = sinon.stub(passwordMock, "checkPassword");
    mockquery_fn3 = sinon.stub(jwtMock, "signInAccessToken");
  });
  afterEach(() => {
    mockquery_fn1.restore();
    mockquery_fn2.restore();
    mockquery_fn3.restore();
  });
  test("if member is not present in data base throw error", async () => {
    mockquery_fn1.resolves([]);
    try {
      await authServices.login({
        email: "",
        password: "",
      });
    } catch (error: any) {
      expect(error.message).toEqual("user not found");
    }
  });

  test("throw error if password not matched", async () => {
    mockquery_fn1.resolves([
      {
        test_data: "test1",
      },
    ]);
    mockquery_fn2.resolves(false);
    try {
      await authServices.login({
        email: "",
        password: "",
      });
    } catch (error: any) {
      expect(error.message).toEqual("invalid password or email");
    }
  });
  test("check token is generated after verifying password ", async () => {
    mockquery_fn1.resolves([
      {
        test_data: "test1",
      },
    ]);
    mockquery_fn2.resolves(true);
    mockquery_fn3.resolves("xyz");
    const res = await authServices.login({
      email: "",
      password: "",
    });
    expect(res).toEqual("xyz");
  });
});
