'use client'
import React from 'react';
import TodoItem from './TodoItem'
import { useState} from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiFilter2Line } from 'react-icons/ri';
import { AiOutlineFlag,  AiOutlineThunderbolt, AiOutlineCheckCircle, AiFillDownSquare, AiTwotoneCalendar,
  AiOutlineFileAdd, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

const TodoList = ({ todos, onDelete, onEdit, onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilter(selectedFilter);
  };

  const tabHeaderDate = [
    {
      text: 'Task',
      icon: <BiTask />,
      sort: true,
      position: 'center'
    },
    {
      text: 'Priority',
      icon: <AiOutlineFlag />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'Action',
      icon: <AiOutlineThunderbolt />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'Status',
      icon: <AiFillDownSquare />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'Date',
      icon: <AiTwotoneCalendar />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'Note',
      icon: <AiOutlineFileAdd />,
      sort: false,
      position: 'center'
    },
    {
      text: 'Edit',
      icon: <AiOutlineEdit />,
      sort: false,
      position: 'center'
    },
    {
      text: 'Delete',
      icon: <AiOutlineDelete />,
      sort: false,
      position: 'center'
    },
  ]

  
  return (
    <>
      <div className="w-full">
        <label htmlFor="filter"><RiFilter2Line/></label>
        <select className="filter_input" id="filter" value={ filter } onChange={ handleFilterChange }>
          <option value="">All</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900 text-white">
            {tabHeaderDate.map( (item,idx) => {
                return (
                  <th key={ idx } className="py-2 px-4 border border-purple-500 text-purple-500">
                    <div className={`flex items-center justify-${item.position}`}>
                      <div>
                        <span className="text-3xl text-blue-500">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                      { item.sort && <span className="flex flex-col">
                          <button className="border-purple-500">
                            { item.sortUpIc }
                          </button>
                          <button className="border-purple-500">
                          { item.sortDownIc }
                          </button>
                        </span> }
                      </div>
                    </div>
                  </th>
                )})
            }
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
