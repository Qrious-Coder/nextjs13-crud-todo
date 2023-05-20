import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";
import Todo from '@/db/models/Todo'

export const GET = requireAuth(async (req) => {
  try {
    await dbConnect();
    const todos = await Todo.find({ user: req.user._id} );
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
});

// export const GET = async (req) => {
//   try {
//     await dbConnect();
//     console.log(`@@@@@@@@@@@@@@@@@=====>`,req)
//     const todos = await Todo.find({ user: '646248f40f1c25e0487bb730'} );
//     return new Response(JSON.stringify(todos), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify(error), { status: 500 });
//   }
// };
