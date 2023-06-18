import Todo from "@/db/models/Todo"
import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const GET = requireAuth(async (req) => {
  try {
    await dbConnect();
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    console.log(`@@@ =========> queryParams`, queryParams)
    const priority = queryParams.get('priority') || null;
    const status = queryParams.get('status') || null;
    const page = queryParams.get('page') || 1;
    const limit = queryParams.get('limit') || 10;
    const sortBy = queryParams.get('sortBy') || null;

    const query = { user: req.user };
    if(priority){
      query.priority = priority
    }

    if(status){
      if( status === 'true'){
        query.status = true
      }else if(status === 'false'){
        query.status = false
      }
    }

    //Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const totalCount = await Todo.countDocuments(query)

    //Sort by mongoDB
    let todos;
    let sortField = sortBy;
    let sortOrder = 1;

    if (sortBy && sortBy.startsWith('-')) {
      sortField = sortBy.substring(1);
      sortOrder = -1;
    }

    if(sortBy){
      todos = await Todo.find(query)
        .sort({ [sortField]: sortOrder }) // sort by custom field
        .skip(skip)
        .limit(pageSize)
    }else{
      todos = await Todo.find(query)
        .sort({ _id: -1}) //Default: Sort the latest document
        .skip(skip)
        .limit(pageSize)
    }

    return new Response(JSON.stringify({ todos, totalCount }), { status: 200 });

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