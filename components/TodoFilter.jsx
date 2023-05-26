import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiFilter2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux'

const TodoFilter = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('status');
    const [selectPriority, setSelectPriority ] = useState('All')
    const [selectStatus, setSelectStatus ] = useState('All')

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    
        setSelectPriority('All')
        setSelectStatus('All')
    
        dispatch(getAllTodosWithFeatures(null, null,null))
      };

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
  );
};

export default Alert;