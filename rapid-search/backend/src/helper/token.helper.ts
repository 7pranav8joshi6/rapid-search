import { SecretKey } from "../config/keys.config";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const tokenHelper = (user: any) => {
  const payload = {
    email: user.email,
    password: user.password,
    name: user.name,
  };

  const options = {
    expiresIn: "1h", // Token expiration time
  };

  return jwt.sign(payload, SecretKey, options);
};
