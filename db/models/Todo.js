import { Schema, model, models }  from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['1', '2', '3', '4'],
    required: true
  },
  action: {
    type:  String,
    required: true,
    default: function() {
      switch (this.priority) {
        case '1':
          return '1';
        case '2':
          return '2';
        case '3':
          return '3';
        case '4':
          return '4';
        default:
          return null;
      }
    }
  },
  note: {
    type: String,
    default: ''
  },
  status: {
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
