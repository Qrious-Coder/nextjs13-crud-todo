import User from '@/models/User'
import {dbConnect} from "@db/dbConnect"
import handler from "@/utils/handlers";

handler.post(createUser)

async function createUser(req, res){
  const data = req.body;
  const { name, email, password } = data
  console.log('route data',data)
  dbConnect()

  const user = await User.create(req.body)
  res.status(201).json({message: 'Registered successfully'})

}

export default handler;