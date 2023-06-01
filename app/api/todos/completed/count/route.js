import Todo from "@/db/models/Todo"
import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";
export const GET = requireAuth(async(req) => {
  try{
    await dbConnect();
    //get completed todos only
    const doneTodoCount = await Todo.countDocuments({ user: req.user, status: true })
    return new Response(JSON.stringify({  doneTodoCount }), {status: 200})
  } catch(err) {
    console.log(err);
    return new Response(`Fetching failed: ${error}`, { status: 500 });
  }
})
