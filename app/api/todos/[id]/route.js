import Todo from '@/db/models/todo';
import {dbConnect} from "@/db/dbConnect";

//Fetch 1 todo

export const GET = async(request, { params }) =>{
  try{
    await dbConnect()
    const foundTodo = await Todo.findById(params.id)
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})
    return new Response(JSON.stringify(foundTodo), {status: 200})
  }catch(err){
    console.log(err)
    return new Response(`Server error`, {status: 500})
  }
}

export const PATCH = async(request, { params }) => {
  const { title, description, completed } = await request.json()
  try{
    await dbConnect()
    const foundTodo = await Todo.findById(params.id)
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})

    //Updated any field if provided
    if(title) foundTodo.title = title;
    if(description) foundTodo.description = description;
    if(completed !== undefined) foundTodo.completed = completed

    return new Response('Updated successfully',{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!`, {status: 500})
  }
}

export const DELETE = async(request, { params }) => {
  try{
    await dbConnect()
    await Todo.findByIdAndRemove(params.id)
    return new Response(`Deleted successfully`,{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!`, {status: 500})
  }
}
