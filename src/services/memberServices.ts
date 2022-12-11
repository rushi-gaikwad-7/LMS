import memberQuery from "../db/dbQuerys/memberQuery";

class memberService {
  // get all members

  async getAllmembers() {
    return await memberQuery.getAllMembers();
  }
}

export default new memberService();
