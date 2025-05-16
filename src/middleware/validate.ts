import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { STATUS_CODES } from '../utils/constants';


export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};