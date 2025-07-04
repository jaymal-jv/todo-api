import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import { MESSAGE, STATUS_CODES } from './utils/constants';
import connectDB from './config/db';
import { startCronJob } from './utils/cron';
dotenv.config();

connectDB();
startCronJob();
const app = express();
// Middleware for security headers
app.use(helmet());

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Rate-limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: MESSAGE.MANY_REQUESTS
});
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.send('Todo List API');
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


// Global error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.SOMETHING_WENT_WRONG });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;