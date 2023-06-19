import bcrypt from "bcrypt";

export async function HashPassword(password) {
  return await bcrypt.hash(password, 10);
}


export async function ComparePassword(clinetPassword, dbPassword) {
  try {
    return await bcrypt.compare(clinetPassword, dbPassword);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
