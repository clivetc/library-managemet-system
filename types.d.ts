import { NextApiRequest } from 'next';

interface AuthenticatedNextApiRequest extends NextApiRequest {
  userId?: string;
}

export { AuthenticatedNextApiRequest };
