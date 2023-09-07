import { Request, Response, NextFunction } from 'express';

export interface SimpleController {
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  list(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  find(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

interface IController extends SimpleController {
  update(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export default IController;