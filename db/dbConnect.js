import mongoose from 'mongoose';

let isConnected =false;

export const dbConnect = async () => {
  mongoose.set('strictQuery',true);

  if(isConnected) {
    console.log('MongoDB is already connected!')
  }

  try{
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'crud_todo',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;

    console.log('MongoDB connected')
  }catch(err){
    console.log(err)
  }
}