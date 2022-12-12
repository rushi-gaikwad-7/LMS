import authQueries from "../db/dbQuerys/authQuery";
import authServices from "../services/authServices";

import sinon from "sinon";
import * as passwordMock from "../utils/bcrypt";

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
