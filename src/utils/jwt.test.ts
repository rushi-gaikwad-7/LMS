import { VerifyAccessToken } from "./jwt";
import { signInAccessToken } from "./jwt";

describe("test bcrypt utils functions ", (): void => {
  test("test password is valid or not", async () => {
    const token = await signInAccessToken({ name: "rushi" });
    const decoded: any = await VerifyAccessToken(token);
    expect(decoded.name).toBe("rushi");
  });
});
