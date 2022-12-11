

import bcrypt from "bcrypt";

export const createHashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const checkPassword = async (password: string, hash_key: string) => {
  return await bcrypt.compare(password, hash_key);
};
