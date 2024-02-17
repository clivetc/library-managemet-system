import { sendEmail } from "./sendEmail";

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const subject = "Password Reset";
	const message = `Click the link below to reset your password: ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

	await sendEmail(email, subject, message);
};
