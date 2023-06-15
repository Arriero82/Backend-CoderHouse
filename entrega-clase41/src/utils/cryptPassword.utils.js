import bcrypt from "bcrypt";

const createHash = async (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPass = async (user, password) =>
  bcrypt.compareSync(password, user.password);

export { createHash, isValidPass };
