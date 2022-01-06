import { sign } from "jsonwebtoken";
import { UserInterface } from "../model/User";

export const getAccessToken = (user: UserInterface): string => {
  return sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};
