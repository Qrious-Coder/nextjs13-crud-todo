'use client'
import React from 'react';
import TodoItem from './TodoItem'
import { useState} from "react";

const TodoList = ({ todos, onDelete, onEdit, onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };
  return (
    <>
      <div>
        <label htmlFor="filter">Filter By:</label>
        <select id="filter" value={ filter } onChange={ handleFilterChange }>
          <option value="">All</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-black text-white">
          <th className="py-2 px-4">Task</th>
          <th className="py-2 px-4">Priority</th>
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
    </>

  );
};

export default TodoList;
