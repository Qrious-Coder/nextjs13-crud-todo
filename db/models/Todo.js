import { Schema, model, models }  from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Important and urgent', 'Important but NOT urgent', 'NOT important but urgent', 'NOT important and NOT urgent'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;
