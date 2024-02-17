import * as crypto from "crypto";

export const jwtSecret = process.env.SECRET_KEY;

/**
 * Generate a unique token of the specified length
 * @param {number} length - The length of the token in bytes
 * @returns {string} The generated unique token
 */

export function generateUniqueToken(length = 32) {
	return crypto.randomBytes(length / 2).toString("hex");
}
