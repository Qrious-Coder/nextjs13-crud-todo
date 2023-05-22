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
      filter: false
    },
    {
      text: 'Priority',
      icon: <AiOutlineFlag />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      filter: true,
      filterIc: <RiFilter2Line/>
    },
    {
      text: 'Action',
      icon: <AiOutlineThunderbolt />,
      sort: false,
      filter: true,
      filterIc: <RiFilter2Line/>
    },
    {
      text: 'Status',
      icon: <AiFillDownSquare />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      filter: true,
      filterIc: <RiFilter2Line/>
    },
    {
      text: 'Date',
      icon: <AiTwotoneCalendar />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      filter: true,
      filterIc: <RiFilter2Line/>
    },
    {
      text: 'Note',
      icon: <AiOutlineFileAdd />,
      sort: false,
      filter: false
    },
    {
      text: 'Edit',
      icon: <AiOutlineEdit />,
      sort: false,
      filter: false
    },
    {
      text: 'Delete',
      icon: <AiOutlineDelete />,
      sort: false,
      filter: false
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
          <tr className="bg-black text-white">
            {
              tabHeaderDate.map( item => {
                return (
                  <th className="py-2 px-4 border-2 border-cyan-200 text-cyan-200">
                    <span>
                      {item.icon}
                    </span>
                    {
                      item.sort && 
                      <span>
                        <button className="text-cyan-200 mr-1">
                          { item.sortUpIc }
                        </button>
                        <button className="text-cyan-200">
                        { item.sortDownIc }
                        </button>
                      </span>
                    }
                    {
                      item.filter && 
                      <span>
                      <button className="text-cyan-200 mr-1">
                        {item.filterIc}
                      </button>
                    </span>
                    }
                  </th>
                )
              })
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
