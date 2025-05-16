import { CronJob } from 'cron';
import Todo from '../models/todo';

const markExpiredTodos = async () => {
  try {
    const now = new Date();
    await Todo.updateMany(
      { dueDate: { $lt: now }, completed: false },
      { completed: true }
    );
    console.log('Expired todos marked as completed');
  } catch (error) {
    console.error('Error in CRON job:', error);
  }
};

export const startCronJob = () => {
  const job = new CronJob('0 0 * * *', markExpiredTodos, null, true, 'UTC');
  job.start();
  console.log('CRON job started');
};