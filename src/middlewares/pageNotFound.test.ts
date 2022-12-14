import request from "supertest";
import app from "../app";

const MockApp = app();

describe("if request route is not present", (): void => {
  test("send response if route address not matched as page not found", async () => {
    const response = await request(MockApp).post("/api").send({});

    expect(response.body).toEqual({
      status: "error",
      statusCode: 404,
      message: "We could not find the resource you requested.",
    });
  });
});
