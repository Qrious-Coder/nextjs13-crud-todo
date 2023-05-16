import Todo from '@/db/models/Todo';
import {dbConnect} from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

//Fetch 1 todo

export const GET = requireAuth(async(request, { params }) =>{
  try{
    await dbConnect()
    const foundTodo = await Todo.findById({ _id: params.id, user: request.user._id })
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})
    return new Response(JSON.stringify(foundTodo), {status: 200})
  }catch(err){
    console.log(err)
    return new Response(`Server error`, {status: 500})
  }
})

export const PATCH = requireAuth(async(request, { params }) => {
  const { title, priority , completed } = await request.json()
  try{
    await dbConnect()

    const foundTodo = await Todo.findById({ _id: params.id, user: request.user._id })
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})

    //Updated any field if provided
    if(title) foundTodo.title = title;
    if(priority) foundTodo.priority = priority;
    if(completed !== undefined) foundTodo.completed = completed

    await foundTodo.save()
    return new Response('Updated successfully',{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!`, {status: 500})
  }
})

export const DELETE = requireAuth(async(request, { params }) => {
  try{
    await dbConnect()
    const deletedTodo = await Todo.findOneAndDelete({ _id: params.id, user: request.user._id });
    if(!deletedTodo){
      return new Response(`Todo does not exist`, { status: 404 });
    }
    return new Response(`Deleted successfully`,{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!`, {status: 500})
  }
})
