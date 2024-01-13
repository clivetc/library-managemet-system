import { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Next {
		interface ApiRequest {
			user?: JwtPayload;
		}
	}
}
