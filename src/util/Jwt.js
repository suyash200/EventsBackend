import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function AssignJwt(email, id) {
  return Jwt.sign({ email: email, id: id}, process.env.Jwt_Secret);
}

export function VerifyJwt(password){
  return Jwt.verify(password,process.env.Jwt_Secret)
}
