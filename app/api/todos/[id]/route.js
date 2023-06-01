import Todo from '@/db/models/Todo';
import {dbConnect} from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const GET = requireAuth(async(req) =>{
  try{
    await dbConnect()
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop();
    const foundTodo = await Todo.findById({ _id: id, user: req.user })
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})
    return new Response(JSON.stringify(foundTodo), {status: 200})
  }catch(err){
    console.log(err)
    return new Response(`Server error`, {status: 500})
  }
})

export const PATCH = requireAuth(async(req ) => {
  const data = await req.json()
  const { title, priority , status , note } = data
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split('/').pop();

  try{
    await dbConnect()
    const foundTodo = await Todo.findById({ _id: id, user: req.user })
    if(!foundTodo) return new Response(`Todo does not exist`, {status: 404})

    //Updated any field if provided
    if(title) foundTodo.title = title;
    if(priority) {
      foundTodo.priority = priority
      foundTodo.action = priority
    }
    if(status !== undefined) foundTodo.status = status
    if(note) foundTodo.note = note

    await foundTodo.save()
    return new Response(JSON.stringify(foundTodo),{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!: ${err}`, {status: 500})
  }
})

export const DELETE = requireAuth(async(req) => {
  try{
    await dbConnect()
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop();

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user });
    if(!deletedTodo){
      return new Response(`Todo does not exist`, { status: 404 });
    }
    return new Response(`Deleted successfully`,{status: 200})
  }catch(err){
    console.log(err)
    return new Response(`server error!`, {status: 500})
  }
})
