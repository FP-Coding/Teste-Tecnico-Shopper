import { NextFunction, Request, Response } from 'express';
import BaseHttpError from '../errors/BaseHTTPError';
import TypeError from '../errors/TypeErrors';

function errorHandler(err: BaseHttpError, _req: Request, res: Response, _next: NextFunction) {
	const { statusCode, message } = err;
	if (statusCode) return res.status(statusCode).json({ message });

	return res.status(TypeError.INTERNAL_ERROR).json({ message: 'Internal server error' });
}
export default errorHandler;