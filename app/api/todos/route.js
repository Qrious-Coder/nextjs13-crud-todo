import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const GET = requireAuth(async (req) => {
  try {
    await dbConnect();
    const todos = await Todo.find({ user: req.user._id });
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all users", { status: 500 });
  }
});
