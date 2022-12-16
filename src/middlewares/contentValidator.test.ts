import request from "supertest";
import app from "../app";

const MockApp = app();

describe("if request  is not valid content", (): void => {
  test("send response if route address not matched as page not found", async () => {
    const response = await request(MockApp)
      .post("/api/v1/books")
      .send("sshshh");

    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: "Invalid Content type",
    });
  });
});
