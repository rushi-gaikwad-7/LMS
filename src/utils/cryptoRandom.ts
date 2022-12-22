import crypto from "crypto";

export const randomString = async () => {
  const random =  crypto.randomBytes(3).toString("hex");
  return random;
};
