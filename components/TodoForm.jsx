'use client'
import React, { useState } from 'react';
import { RiFileTextLine, RiFlashlightLine, RiSearchLine, RiAddLine } from 'react-icons/ri';
import { prioTypes} from '@/utils/todoTypes'
import {AiOutlineFlag} from "react-icons/ai";

const TodoForm = ({ onSearch, onAddTodo, isSmallScreen}) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 4,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(formData.title);
    setFormData({ ...formData, title: '' }); // clears the search input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(formData)
    setFormData({ title: '', priority: 4 });
  };
  const priorityInputWidth = isSmallScreen ? '5%' : '40%';
  return (
    <form onSubmit={ handleSubmit } className="glassmorphism w-full flex items-center justify-between my-4">
      <div className="relative flex items-center flex-grow" style={{ width: '50%' }}>
        <RiFileTextLine className="absolute left-3 text-gray-500 text-lg" />
        <input
          type="text"
          name="title"
          value={ formData.title }
          onChange={ handleChange }
          placeholder="Task..."
          className="text_input"
          style={{ color: 'gray', fontSize: '14px', paddingLeft: '35px', paddingTop: '12px' }}
        />
        <RiSearchLine className="absolute right-3 text-xl text-gray-500 hover:text-green-500 cursor-pointer" onClick={ handleSearchSubmit }/>
      </div>
      <div className="relative flex items-center flex-grow ml-3" style={{ width: priorityInputWidth }}>
        <AiOutlineFlag className="absolute left-3 text-center text-gray-500 text-xl" />
        <select
          name="priority"
          value={ formData.priority }
          onChange={ handleChange }
          className="text_input"
          style={{
            color: 'gray',
            fontSize: '14px',
            paddingLeft: '30px',
            paddingTop: '14px'
          }}
        >
          { Object.entries(prioTypes).map(([key, value]) => (
            <option key={key} value={value}>
              {isSmallScreen ? key : value}
            </option>
          )) }
        </select>
      </div>

      <button type="submit" className="form_btn gradient_btn mt-2 ml-3">
        <RiAddLine className="text-lg"/>
      </button>
    </form>
  );
};

export default TodoForm;
