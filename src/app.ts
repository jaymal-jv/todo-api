import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Todo List API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;