import authQuery from "../db/dbQuerys/authQuery";
import { loginUserBody, userBody } from "../types/authTypes";
import { checkPassword, createHashPassword } from "../utils/bcrypt";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../utils/errorClass";
import { signInAccessToken } from "../utils/jwt";

class authService {
  //register new member is db
  
  async addNewMember(body: userBody) {
    const { name, password, email, role } = body;

    const member: any = await authQuery.findMember(email);
    if (member) {
      throw new FORBIDDEN("user already exist");
    }
    const hash_key = await createHashPassword(password);
    await authQuery.addNewMember({
      name,
      email,
      hash_key,
      role,
    });
  }

  //login  member with correct credientials

  async login(userData: loginUserBody) {
    const { password, email } = userData;

    const member: any = await authQuery.findMember(email);
    if (!member) {
      throw new NOT_FOUND("user not found");
    }
    const { role, member_id, hash_key } = member;
    const verifyPassword = await checkPassword(password, hash_key);
    if (!verifyPassword) {
      throw new UNAUTHORIZED("invalid password or email");
    }
    const token = await signInAccessToken({ member_id, email, role });
    return token;
  }
}

export default new authService();
