import db from "../connection";

class memberQuery {
  // get all memebers data

  async getAllMembers() {
    return await db("members").select("*");
  }
}
export default new memberQuery();
