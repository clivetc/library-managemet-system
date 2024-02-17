import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASSWORD,
	},
});

export const sendEmail = async (
	to: string,
	subject: string,
	message: string,
) => {
	try {
		// Send the email
		await transporter.sendMail({
			from: process.env.SMTP_EMAIL,
			to,
			subject,
			text: message,
		});
		console.log(`Email sent to ${to}`);
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
};
