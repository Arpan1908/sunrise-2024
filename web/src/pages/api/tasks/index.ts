import type { NextApiRequest, NextApiResponse } from 'next';
import {
  initializeTasks,
  getActiveTasks,
  getCompletedTasks,
  getAllTasks,
  completeTask,
  createTask,
  updateTask,
  deleteTask
} from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { action, taskId, taskTitle } = req.query;

  switch (method) {
    case 'GET':
      if (action === 'all') {
        const tasks = getAllTasks();
        res.status(200).json(tasks);
      } else if (action === 'active') {
        const tasks = getActiveTasks();
        res.status(200).json(tasks);
      } else if (action === 'completed') {
        const tasks = getCompletedTasks();
        res.status(200).json(tasks);
      } else {
        res.status(400).json({ message: 'Invalid action' });
      }
      break;

    case 'POST':
      if (action === 'initialize') {
        initializeTasks();
        res.status(200).json({ message: 'Tasks initialized' });
      } else {
        const { title, description, persona, group } = req.body;
        createTask(title, description, persona, group);
        res.status(201).json({ message: 'Task created' });
      }
      break;

    case 'PUT':
      if (action === 'complete' && typeof taskTitle === 'string') {
        completeTask(taskTitle);
        res.status(200).json({ message: 'Task completed' });
      } else {
        const updatedTask = req.body;
        updateTask(Number(taskId), updatedTask);
        res.status(200).json({ message: 'Task updated' });
      }
      break;

    case 'DELETE':
      deleteTask(Number(taskId));
      res.status(200).json({ message: 'Task deleted' });
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
