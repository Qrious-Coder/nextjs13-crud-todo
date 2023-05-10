import Todo from '@/db/models/todo';
import {dbConnect} from "@db/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { title, description } = req.body;

      const newTodo = new Todo({
        title,
        description,
      });

      const createdTodo = await newTodo.save();

      res.status(201).json(createdTodo);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
