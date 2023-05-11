import { Schema, model, models }  from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;
