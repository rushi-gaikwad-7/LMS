import memberQuery from "../db/dbQuerys/memberQuery";
import { NOT_FOUND } from "../utils/errorClass";

class memberService {
  // get all members

  async getAllmembers() {
    const member_data = await memberQuery.getAllMembers();
    if (member_data.length === 0) {
      throw new NOT_FOUND();
    }
    return member_data;
  }
}

export default new memberService();
