import request from "supertest";
import app from "../app";

const MockApp = app();

describe("test member schema validation", (): void => {
  test.skip("throw error if no title field present in req body ", async () => {
    const response = await request(MockApp)
      .post("/api/v1/admin/addnewbook")
      .set(
        "Cookie",
        "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOiI5OWViZDI0Zi03MjM4LTQ3MWItOTI0OS02MzM2ZTA4NmE4MGMiLCJlbWFpbCI6InJ1c2hpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MDU4MjE4MywiZXhwIjoxNjcwNTg1NzgzfQ.B34ABpQLNoulklXa1oi8Th7tP3CwAAxkeXipcEEzI0k"
      )
      .send({});
    // query.resolves();
    expect(response.body).toEqual({
      status: "error",
      statusCode: 400,
      message: "Invalid syntax for this request was provided.",
      error_detail: '"title" is required',
    });
  });
});
