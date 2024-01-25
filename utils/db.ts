import { Client } from "pg"; // Import the Client class from 'pg'

async function connectToDatabase() {
	const client = new Client({
		connectionString: process.env.POSTGRES_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});

	try {
		await client.connect(); // Connect to the database
		console.log("Connected to the database");
	} catch (error) {
		console.error("Error connecting to the database:", error);
	} finally {
		client.end(); // Close the database connection when done
	}
}

export { connectToDatabase };
