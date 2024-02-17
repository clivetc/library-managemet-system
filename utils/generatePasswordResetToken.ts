import { jwtSecret } from "./secretKey";
import jwt from "jsonwebtoken";

export const generatePasswordResetToken = (userId: string) => {
	const token = jwt.sign({ userId }, jwtSecret as string, { expiresIn: "1h" });
	return token;
};
