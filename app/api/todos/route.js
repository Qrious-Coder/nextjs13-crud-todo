import Todo from '@/db/models/Todo'
import { dbConnect } from "@/db/dbConnect";

//Todo: user next-connect later
export const GET = async (request) => {
  try {
    await dbConnect()
    const todos = await Todo.find({})
    return new Response(JSON.stringify(todos), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all users", { status: 500 })
  }
}
