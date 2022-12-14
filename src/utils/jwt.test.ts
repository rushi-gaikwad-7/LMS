import { VerifyAccessToken } from "./jwt";
import { signInAccessToken } from "./jwt";

describe("test jwt utils functions ", (): void => {
  test("test jwt  is generated and is valid", async () => {
    const token = await signInAccessToken({ name: "rushi" });
    const decoded: any = await VerifyAccessToken(token);
    expect(decoded.name).toBe("rushi");
  });
});
