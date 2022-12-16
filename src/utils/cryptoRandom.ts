import crypto from "crypto";

export const randomString = async () => {
  const random = await crypto.randomBytes(3).toString("hex");
  return random;
};
