'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import { FaStickyNote } from 'react-icons/fa';
import { editTodo } from '@/redux/actions/todoActions';
import {  actionTypes, prioTypes } from '@/utils/todoTypes'

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const [editableTodoId, setEditableTodoId] = useState('');
  const [curTodo, setCurTodo] = useState(todo);
  const editable = editableTodoId === curTodo._id;

  const handleInputChange = (e) => {
    setCurTodo({ ...curTodo, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    dispatch(editTodo(id, curTodo));
    setEditableTodoId(null);
  };

  const handleEdit = (id) => {
    setEditableTodoId(id);
  };

  const handleNote = (id) => {
    alert('The function is still under development!')
  }

  return (
    <tr key={curTodo._id} className="border-t">
      {/* ------------- task --------------*/}
      <td className="table_row">
        {editable ? (
          <input
            className="text_input"
            type="text"
            name="title"
            value={curTodo.title}
            onChange={(e) => handleInputChange(e)}
          />
        ) : (
          curTodo.title
        )}
      </td>
      {/* ------------- priority --------------*/}
      <td className="table_row">
        {editable ? (
          <select
            className="text_input"
            name="priority"
            value={curTodo.priority}
            onChange={(e) => handleInputChange(e)}
          >
            <option value={ 1 }>{ prioTypes[1] }</option>
            <option value={ 2 }>{ prioTypes[2] }</option>
            <option value={ 3 }>{ prioTypes[3] }</option>
            <option value={ 4 }>{ prioTypes[4] }</option>
          </select>
        ) : (
          curTodo.priority
        )}
      </td>
      {/* ------------- action --------------*/}
      <td className="table_row">
        {actionTypes[ curTodo.action ]} 
      </td>
      {/* ------------- status --------------*/}
      <td className="table_row">
        <input
          className="text_input"
          type="checkbox"
          checked={curTodo.completed}
          onChange={() => onEdit(curTodo._id, { completed: !curTodo.completed })}
        />
      </td>
     {/* ------------- Date --------------*/}
      <td className="table_row">{curTodo.createdAt}</td>
      {/* ------------- Add note--------------*/}
      <td className="table_row">
        <button className="outline_btn flex justify-center" onClick={() => handleNote(curTodo._id)}>
          <FaStickyNote />
        </button>
      </td>
       {/* ------------- Edit --------------*/}
      <td className="table_row">
        {editable ? (
          <button className="outline_btn flex justify-center" onClick={() => handleSave(curTodo._id, todo)}>
            <AiOutlineSave />
          </button>
        ) : (
          <button className="outline_btn flex justify-center" onClick={() => handleEdit(curTodo._id)}>
            <AiOutlineEdit />
          </button>
        )}
      </td>
       {/* ------------- Delete --------------*/}
      <td className="table_row">
        <button className="outline_btn flex justify-center" onClick={() => onDelete(curTodo._id)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
