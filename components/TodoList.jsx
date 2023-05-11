import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

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
        <tr key={todo._id} className="border-t">
          {/*<td className="py-2 px-4 text-center border border-gradient">{todo._id}</td>*/}
          <td className="py-2 px-4 text-center border border-gradient">{todo.title}</td>
          <td className="py-2 px-4 text-center border border-gradient">{todo.description}</td>
          <td className="py-2 px-4 text-center border border-gradient">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onEdit(todo._id, { completed: !todo.completed })}
            />
          </td>
          <td className="py-2 px-4 text-center border border-gradient">{todo.date}</td>
          <td className="py-2 px-4 text-center border border-gradient">
            <button className="outline_btn flex justify-center" onClick={() => onEdit(todo._id, todo)}>
              <AiOutlineEdit />
            </button>
          </td>
          <td className="py-2 px-4 text-center border border-gradient">
            <button className="outline_btn flex justify-center" onClick={() => onDelete(todo._id)}>
              <AiOutlineDelete />
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default TodoList;
