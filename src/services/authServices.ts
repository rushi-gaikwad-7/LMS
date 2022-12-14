import authQuery from "../db/dbQuerys/authQuery";
import { loginUserBody, userBody } from "../types/authTypes";
import { checkPassword, createHashPassword } from "../utils/bcrypt";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../utils/errorClass";
import { signInAccessToken } from "../utils/jwt";

class authService {
  //register new member is db

  async addNewMember(body: userBody) {
    const { name, password, email, role } = body;

    const member = await authQuery.findMember(email);
    if (member.length === 0) {
      const hash_key = await createHashPassword(password);
      if (hash_key) {
        return await authQuery.addNewMember({
          name,
          email,
          hash_key,
          role,
        });
      }
    }
    throw new FORBIDDEN("user already exist");
  }

  //login  member with correct credientials

  async login(userData: loginUserBody) {
    const { password, email } = userData;
    const member: any = await authQuery.findMember(email);
    if (member.length === 0) {
      throw new NOT_FOUND("user not found");
    }
    const { role, member_id, hash_key } = member[0];
    const verifyPassword = await checkPassword(password, hash_key);
    if (!verifyPassword) {
      throw new UNAUTHORIZED("invalid password or email");
    }
    const token = await signInAccessToken({ member_id, email, role });
    return token;
  }
}

export default new authService();
