import Todo from "@/db/models/Todo"
import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const GET = requireAuth(async (req) => {
  try {
    await dbConnect();
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    console.log(`@@@ =========> param`, req.url.split('?')[1])
    const priority = queryParams.get('priority') || null;
    const status = queryParams.get('status') || null;
    const page = queryParams.get('page') || 1;
    const limit = queryParams.get('limit') || 10;
    const sortBy = queryParams.get('sortBy') || null;

    const query = { user: req.user };

    //Filter by priorty and status
    if(priority){
      query.priority = priority
    }

    if(status){
      if( status === 'completed'){
        query.completed = true
      }else if(status === 'uncompleted'){
        query.completed = false
      }
    }

    //Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch todos, applied filtering and pagination
    let todos = await Todo.find(query)
      .skip(skip)
      .limit(pageSize);

    //Sorting
    if (sortBy) {
      const sortField = sortBy.substring(1);
    
      todos = todos.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return -1;
        }
        if (a[sortField] > b[sortField]) {
          return 1;
        }
        return 0;
      });
    }

    return new Response(JSON.stringify(todos), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(`Fetching failed: ${error}`, { status: 500 });
  }
});

//**Previous GET request:
// export const GET = requireAuth(async(req) => {
//   try{
//     let todos = await Todo.find({ user: req.user })
//     return new Response(JSON.stringify(todos), {status: 200})
//   } catch(err) {
//     console.log(err);
//     return new Response(`Fetching failed: ${error}`, { status: 500 });
//   }
// })
//