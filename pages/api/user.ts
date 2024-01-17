// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "@/utils/model/user";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtSecret } from "@/utils/secretKey";
import { cors } from "@/utils/middleware";
import { connectToDatabase } from "@/utils/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await cors(req, res);
	const client = await connectToDatabase();

	if (req.method === "POST") {
		const { firstName, lastName, email, name, password, action, isadmin } =
			req.body;

		try {
			// Validate if the required fields are provided
			if (action === "login") {
				if (!email || !password) {
					return res
						.status(400)
						.json({ error: "Email and password are required" });
				}

				// Find the user by email
				const user = await User.findOne({ where: { email } });
				if (!user) {
					return res.status(401).json({ error: "Invalid email or password" });
				}

				// Compare the provided password with the stored hashed password
				const passwordMatch = await bcrypt.compare(password, user.password);
				if (!passwordMatch) {
					return res.status(401).json({ error: "Invalid email or password" });
				}

				const accessTokenOptions: SignOptions = {
					expiresIn: "14d", // 2 weeks
				};

				const accessToken = jwt.sign(
					{ userId: user.id, email: user.email },
					jwtSecret as string, // Cast to string
					accessTokenOptions,
				);

				// Return a success message or user data
				return res.status(200).json({
					message: "Login successful",
					currentUser: user,
					accessToken,
				});
			}
			if (action === "addAdmin") {
				if (!firstName || !lastName || !email || !name || !password) {
					return res.status(400).json({
						error:
							"First Name,Last Name ,Email, Name and Password are required",
					});
				}

				// Check if the user already exists
				const existingUser = await User.findOne({ where: { email } });
				if (existingUser) {
					return res.status(400).json({ error: "User already exists" });
				}

				// Hash the password
				const hashedPassword = await bcrypt.hash(password, 10);

				// Create the user
				const user = await User.create({
					email,
					firstName,
					lastName,
					name,
					password: hashedPassword,
					isadmin,
				});

				return res.status(201).json({ user });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	if (req.method === "GET") {
		// Your GET request logic here
		try {
			// Fetch all users from the database
			const data = await User.findAll();
			return res.status(200).json({ data });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
	return res.status(405).json({ error: "Method Not Allowed" });
}
