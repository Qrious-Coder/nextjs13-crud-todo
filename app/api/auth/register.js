import User from '@/models/User'
import {dbConnect} from "@db/dbConnect"

export async function POST(req, res){
  try{
    dbConnect()
    const data = req.body;
    const { name , email, password} = data

    await User.create( data )
    res.status(201).json({message: "register successfully"})
  } catch(err){
    console.log( err)
    res.status(501).json({message: "failed"})
  }
}