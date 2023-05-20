import Todo from "@/app/api/auth/middleware/requireAuth"
import { dbConnect } from "@/db/dbConnect";
import { requireAuth } from "@/app/api/auth/middlewares/requireAuth";

export const GET = requireAuth(async (req) => {
  try {
    await dbConnect();
    const { priority, status, page, limit, sortBy } = req.query
    const query = { user: req.user._id }
    
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
      const sortOrder = sortBy.charAt(0) === "-" ? -1 : 1;
      todos = todos.sort({ [sortField]: sortOrder });
    }
    
    return new Response(JSON.stringify(todos), { status: 200 });
    
  } catch (error) {
    console.error(error);
    return new Response(`Fetching failed: ${error}`, { status: 500 });
  }
});
