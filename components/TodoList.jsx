'use client'
import React from 'react';
import TodoItem from './TodoItem'
import { useState} from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiFilter2Line } from 'react-icons/ri';
import { AiOutlineFlag,  AiOutlineThunderbolt, AiOutlineCheckCircle, AiFillDownSquare, AiTwotoneCalendar,
  AiOutlineFileAdd, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
import { useDispatch } from 'react-redux'
import { getAllTodosWithFeatures } from '@/redux/actions/todoActions'
import {prioTypes} from "@/utils/todoTypes";

const TodoList = ({ todos, onDelete, onEdit }) => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('status');
  const [selectPriority, setSelectPriority ] = useState('All')
  const [selectStatus, setSelectStatus ] = useState('All')
  const tabHeaderDate = [
    {
      text: 'task',
      icon: <BiTask />,
      sort: true,
      position: 'center'
    },
    {
      text: 'priority',
      icon: <AiOutlineFlag />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'action',
      icon: <AiOutlineThunderbolt />,
      sort: false,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'status',
      icon: <AiFillDownSquare />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'date',
      icon: <AiTwotoneCalendar />,
      sort: false,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'note',
      icon: <AiOutlineFileAdd />,
      sort: false,
      position: 'center'
    },
    {
      text: 'edit',
      icon: <AiOutlineEdit />,
      sort: false,
      position: 'center'
    },
    {
      text: 'delete',
      icon: <AiOutlineDelete />,
      sort: false,
      position: 'center'
    },
  ]

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    setSelectPriority('All')
    setSelectStatus('All')

    dispatch(getAllTodosWithFeatures(null, null,null))
  };

  const handleSort = (sortBy) => {
      dispatch(getAllTodosWithFeatures(null,null, sortBy))
  }

  const handlePrioritySubFilterChange = (e) => {
    const value = e.target.value;
    setSelectPriority(value)
    dispatch(getAllTodosWithFeatures(value, null, null))
  }

  const handleStatusSubFilterChange = (e) =>{
    const value = e.target.value
    setSelectStatus(value)
    dispatch(getAllTodosWithFeatures(null,value, null))
  }

  return (
    <>
      {/*-----------filter----------------*/}
      <div className="flex justify-end mb-4">
        <label htmlFor="filter" className="mt-1 mr-2">
          <RiFilter2Line className="text-purple-500 text-2xl"/>
        </label>
        <select
          id="filter"
          className="filter_input"
          value={ filter }
          onChange={ handleFilterChange }>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>

        {filter === 'priority' && (
          <select className="filter_input" style={{width: '30%'}}
              id="priority" value={ selectPriority }
              onChange={ handlePrioritySubFilterChange }>
            <option value="">All</option>
            <option value={ '1' }>{ prioTypes[1] }</option>
            <option value={ '2' }>{ prioTypes[2] }</option>
            <option value={ '3' }>{ prioTypes[3] }</option>
            <option value={ '4' }>{ prioTypes[4] }</option>
          </select>
        )}

        {filter === 'status' && (
          <select className="filter_input"
                  style={{width: '30%'}}
                  id="status" value={ selectStatus }
                  onChange={ handleStatusSubFilterChange  }>
            <option value="">All</option>    
            <option value={ 'true' }>Done</option>
            <option value={ 'false' }>Undone</option>
          </select>
        )}
      </div>
      {/*-----------table----------------*/}
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
                          <button className="border-purple-500"
                            onClick = { () => handleSort(`-${item.text}`) }>
                            { item.sortUpIc }
                          </button>
                          <button className="border-purple-500"
                            onClick = { () => handleSort(`${item.text}`) }>
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
