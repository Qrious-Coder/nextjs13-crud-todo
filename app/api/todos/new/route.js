import Todo from '@/db/models/Todo';
import {dbConnect} from "@/db/dbConnect";

export const POST  = async (request) => {
  const { title, priority } = await request.json()
  try {
    await dbConnect()
    const newTodo = new Todo({title, priority})
    await newTodo.save()
    return new Response(JSON.stringify(newTodo ), {status: 201})
  } catch(err){
    return new Response('Failed to fetch all todos', {status: 500})
  }
}
