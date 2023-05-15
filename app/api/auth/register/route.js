import { dbConnect } from "@/db/dbConnect";
import User from "@/db/models/User"

export async function POST(request) {
    try{
        await dbConnect()
        const { name, email, password } = await request.json()
        const user = new User({ name, email, password })
        await user.save()

        return new Response(JSON.stringify(user), {status: 201})
    }catch(err){
        return new Response('Fail to register', {status: 500})
    }
}