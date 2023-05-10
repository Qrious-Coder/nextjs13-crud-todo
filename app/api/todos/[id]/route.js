import Todo from '@/db/models/todo';
import {dbConnect} from "@db/dbConnect";

export default async function handler(req, res) {
  const { method, query: { id } } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const todo = await Todo.findById(id);
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'PUT':
      try {
        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!updatedTodo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'DELETE':
      try {
        const deletedTodo = await Todo.findByIdAndRemove(id);
        if (!deletedTodo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
}