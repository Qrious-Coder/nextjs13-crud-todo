import React from 'react';

const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Date</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {todos.map((todo) => (
        <tr key={todo.id}>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onEdit(todo.id, { completed: !todo.completed })}
            />
          </td>
          <td>{todo.date}</td>
          <td>
            <button onClick={() => onEdit(todo.id, todo)}>Edit</button>
          </td>
          <td>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default TodoList;
