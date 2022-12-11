import { newUserBody } from "../../types/authTypes";
import db from "../connection";

class authQuery {
  // find memeber is present in db or not

  async findMember(email: string) {
    return await db("members").where({ email }).first("*");
  }

  //add new member in db

  async addNewMember(payload: newUserBody) {
    return await db("members").insert(payload).returning("*");
  }
}

export default new authQuery();
