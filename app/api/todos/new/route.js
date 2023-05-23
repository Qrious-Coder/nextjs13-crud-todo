import Todo from '@/db/models/Todo';
import {dbConnect} from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const POST  = requireAuth(async (request) => {
  const { title, priority } = await request.json()
  try {
    await dbConnect()
    const newTodo = new Todo({
      title,
      priority,
      user: request.user,
    });
    await newTodo.save()
    return new Response(JSON.stringify(newTodo ), {status: 201})
  } catch(err){
    console.error(err);
    return new Response('Failed to fetch all todos', {status: 500})
  }
})
