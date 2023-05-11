import React from 'react';


const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
      <tr className="bg-black text-white">
        {/*<th className="py-2 px-4">ID</th>*/}
        <th className="py-2 px-4">Title</th>
        <th className="py-2 px-4">Description</th>
        <th className="py-2 px-4">Status</th>
        <th className="py-2 px-4">Date</th>
        <th className="py-2 px-4">Edit</th>
        <th className="py-2 px-4">Delete</th>
      </tr>
      </thead>
      <tbody>
      {todos.map((todo) => (
          <TodoItem
            todo = { todo }
            key = { todo._id }
            onDelete = { onDelete }
            onEdit = { onEdit } 
          />
      ))}
      </tbody>
    </table>
  );
};

export default TodoList;
