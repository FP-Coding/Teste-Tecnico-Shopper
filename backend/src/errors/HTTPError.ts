import BaseHttpError from './BaseHTTPError';

class HTTPError extends BaseHttpError {
	constructor (message: string, statusCode: number) {
		super(message, statusCode);
	}
}

export default HTTPError;