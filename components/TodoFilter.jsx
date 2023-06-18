import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiFilter2Line } from 'react-icons/ri';
import { prioTypes } from "@/utils/todoTypes";
import { getAllTodosWithFeatures } from "@/redux/actions/todoActions";
import {SlRefresh} from "react-icons/sl";

const TodoFilter = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('status');
    const [selectPriority, setSelectPriority ] = useState('All')
    const [selectStatus, setSelectStatus ] = useState('All')

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setSelectPriority('All')
        setSelectStatus('All')
        dispatch(getAllTodosWithFeatures(null, null,null))
      };

    const handlePrioritySubFilterChange = (e) => {
      setSelectPriority(e.target.value)
      dispatch(getAllTodosWithFeatures(e.target.value, null, null))
    }

    const handleStatusSubFilterChange = (e) =>{
      setSelectStatus(e.target.value)
      dispatch(getAllTodosWithFeatures(null,e.target.value, null))
    }

    const clearSort = () => {
      dispatch(getAllTodosWithFeatures())
    };
      
  return (
    <div className="flex justify-end mb-4">
        <button onClick={ clearSort }><SlRefresh className="text-violet-500 text-xl mr-2"/> </button>
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
  );
};

export default TodoFilter;