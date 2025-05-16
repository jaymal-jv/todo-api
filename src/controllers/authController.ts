import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { MESSAGE } from '../utils/constants';
import { STATUS_CODES } from '../utils/constants';


export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: MESSAGE.USER_EXISTS });
    }
    const user = new User({ email, password });
    await user.save();
    return res.status(STATUS_CODES.CREATED).json({ message: MESSAGE.SIGNUP_SUCCESS });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
  }
};

export const login = async (req: Request, res: Response): Promise<any>  => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ error: MESSAGE.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });
    return res.json({ token });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
  }
};