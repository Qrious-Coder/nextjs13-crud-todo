import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI
let isConnected =false;

export const dbConnect = async () => {
  mongoose.set('strictQuery',true);

  if(isConnected) {
    console.log('MongoDB has already connected!')
  }
  try{
    await mongoose.connect(MONGODB_URI, {
      dbName: 'crud_todo',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;

    console.log('Yeah! MongoDB connected!')
  }catch(err){
    console.log(err)
  }
}