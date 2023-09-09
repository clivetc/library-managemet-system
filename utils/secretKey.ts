import * as crypto from 'crypto';

export const jwtSecret = crypto.randomBytes(64).toString('hex');

