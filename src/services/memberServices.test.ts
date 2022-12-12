import memberQueries from "../db/dbQuerys/memberQuery";
import memberServices from "../services/memberServices";
import sinon from "sinon";

/// GETALLBOOKS FUNCTION TESTING

describe("Testing for fething  books data", () => {
  let mockquery_fn: sinon.SinonStub<[], Promise<unknown[]>>;
  beforeEach(() => {
    mockquery_fn = sinon.stub(memberQueries, "getAllMembers");
  });
  afterEach(() => {
    mockquery_fn.restore();
  });
  test("if members data fetched successfully from db send array of object", async () => {
    mockquery_fn.resolves([
      {
        test_data: "test1",
      },
    ]);
    const response = await memberServices.getAllmembers();
    expect(response).toEqual([
      {
        test_data: "test1",
      },
    ]);
  });

  test("if books data is empty in db send empty array of object and the error", async () => {
    try {
      mockquery_fn.resolves([]);
      await memberServices.getAllmembers();
    } catch (error: any) {
      expect(error.message).toEqual("fetching data is failed");
    }
  });
});
