import { Schema, model, models }  from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  action: {
    type: Number,
    required: true,
    default: () => {
      switch(this.history){
        case 1:
          this.action = 1;
          break;
        case 2:
          this.action = 2;
          break;
        case 3:
          this.action = 3;
          break;
        case 4:
          this.action = 4;
          break;
        default:
          this.action = null;
          break;
      }
    }
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
