import { Request, Response } from 'express';
import Todo from '../models/todo';
import { MESSAGE, STATUS_CODES } from '../utils/constants';

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = new Todo({
      title,
      description,
      dueDate,
      user: req.user!.userId
    });
    await todo.save();
    res.status(STATUS_CODES.CREATED).json({ message: MESSAGE.TODO_CREATED, todo });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;
  
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
      const skip = (pageNumber - 1) * limitNumber;

      const userId = req.user?.userId;

      // Run both queries in parallel for better performance
      const [todos, totalTodos] = await Promise.all([
        Todo.find({ user: userId })
          .sort({ dueDate: -1 })
          .skip(skip)
          .limit(limitNumber),
  
        Todo.countDocuments({ user: userId })
      ]);
  
      res.json({
        todos,
        totalTodos,
        totalPages: Math.ceil(totalTodos / limitNumber),
        currentPage: pageNumber,
      });
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
    }
  };
  

export const updateTodo = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user!.userId },
      { title, description, dueDate, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: MESSAGE.NOT_FOUND });
    }
    res.json({ message: MESSAGE.TODO_UPDATED, todo });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user!.userId });
    if (!todo) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: MESSAGE.NOT_FOUND });
    }
    res.json({ message: MESSAGE.TODO_DELETED });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGE.SERVER_ERROR });
  }
};