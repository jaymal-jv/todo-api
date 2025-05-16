import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import Joi from 'joi';

const router = express.Router();

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().required()
});

router.use(authMiddleware);
router.post('/', validate(todoSchema), createTodo);
router.get('/', getTodos);
router.put('/:id', validate(todoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;