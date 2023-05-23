'use client'
import React, { useState } from 'react';
import { RiFileTextLine, RiFlashlightLine, RiSearchLine, RiAddLine } from 'react-icons/ri';
import { createTodo, searchTodo } from '@/redux/actions/todoActions';
import { useDispatch } from 'react-redux';
import { prioTypes} from '@/utils/todoTypes'

const TodoForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    priority: 'NOT important and NOT urgent',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo(formData));
    setFormData({ title: '', priority: 'NOT important and NOT urgent' });
  };

  const handleSearch = () => {
    dispatch(searchTodo(formData.title));
  };

  return (
    <form onSubmit={ handleSubmit } className="glassmorphism w-full flex items-center justify-between my-4">
      <div className="relative flex items-center flex-grow" style={{ width: '70%' }}>
        <RiFileTextLine className="absolute left-3 text-gray-500" />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
          className="text_input"
          style={{ color: 'gray', fontSize: '14px', paddingLeft: '30px' }}
        />
      </div>
      <div className="relative flex items-center flex-grow ml-3" style={{ width: '70%' }}>
        <RiFlashlightLine className="absolute left-3 text-gray-500" />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="text_input"
          style={{ color: 'gray', fontSize: '14px', paddingLeft: '30px' }}
        >
          <option value={ 1 }> { prioTypes[1] } </option>
          <option value={ 2 }> { prioTypes[2] } </option>
          <option value={ 3 }> { prioTypes[3] } </option>
          <option value={ 4 }> { prioTypes[4] } </option>
        </select>
      </div>
      <button type="button" className="form_btn mt-3 ml-3" onClick={handleSearch}>
        <RiSearchLine />
      </button>
      <button type="submit" className="form_btn gradient_btn mt-3 ml-3">
        <RiAddLine />
      </button>
    </form>
  );
};

export default TodoForm;
