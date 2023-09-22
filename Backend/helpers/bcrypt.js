import bcrypt from "bcrypt";

// Password Hashing
export const hashPassword = async (password) => {
  try {
    const saltRound = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(`Error in hashPassword (bcrypt.js) : ${error}`);
  }
};

// Compare Password
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(`Error in comparePassword (bcrypt.js) : ${error}`);
  }
};
