import * as s from "cookie-parser";
import { VerifyJwt } from "../util/Jwt.js";
import { json } from "express";

export function AuthCheck() {
  return (req, res, next) => {
    const authtoken = req.headers.authorization;
    try {
      if (!authtoken || !authtoken.startsWith("Bearer")) {
        res.send("plz login");
        res.status(201);
      }
      const token = authtoken.split(" ")[1];
      const verifyJwt = VerifyJwt(token);
      if (verifyJwt != null) {
        next();
      }
    } catch (error) {
      res.status(401);
      res.send(error);
    }
  };
}
