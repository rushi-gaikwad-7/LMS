import { createHashPassword } from "./bcrypt";
import { checkPassword } from "./bcrypt";

describe("test bcrypt utils functions ", (): void => {
  test("test password is valid or not", async () => {
    //act
    const hash = await createHashPassword("password");
    const isvalid = await checkPassword("password", hash);
    const isInvalidvalid = await checkPassword("pass", hash);
    //assert
    expect(isvalid).toBe(true);
    expect(isInvalidvalid).toBe(false);
  });
});
