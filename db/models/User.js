import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator'

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Account already exists"],
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Must be at least 6 characters long"],
      select: false, //don't send password
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: [
          'user',
          'admin'
        ],
      }
    },
  },
  { timestamps: true }
);

// ENCRYPTION
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = models.User || model('User', UserSchema);

export default User;
