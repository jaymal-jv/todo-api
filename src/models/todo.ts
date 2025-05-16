import mongoose, { Schema, Document } from 'mongoose';
import { ITodo } from '../interfaces/todo';

interface ITodoDocument extends ITodo, Document {}

const todoSchema = new Schema<ITodoDocument>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ITodoDocument>('Todo', todoSchema);