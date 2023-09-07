import { NextFunction, Request, Response } from 'express';
import BaseHttpError from '../errors/BaseHTTPError';

function errorHandler(err: BaseHttpError, _req: Request, res: Response, _next: NextFunction) {
	const { statusCode, message } = err;
	if (statusCode) return res.status(statusCode).json({ message });

	return res.status(500).json({ message: 'Internal server error' });
}
export default errorHandler;