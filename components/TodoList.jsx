'use client'
import React from 'react';
import TodoItem from './TodoItem'
import { useState} from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiFilter2Line } from 'react-icons/ri';
import { AiOutlineFlag, AiOutlineCheckCircle, AiOutlineExclamationCircleAiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

const TodoList = ({ todos, onDelete, onEdit, onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };
  return (
    <>
      <div className="w-full">
        <label htmlFor="filter">Filter By:</label>
        <select className="filter_input" id="filter" value={ filter } onChange={ handleFilterChange }>
          <option value="">All</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-black text-white">
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Task</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Priority</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Action</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Status</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Date</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Note</th>
          <th className="py-2 px-4 border-cyan-200 text-cyan-200">Edit</th>
          <th className="py-2px-4 border-cyan-200 text-cyan-200">Delete</th>
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
