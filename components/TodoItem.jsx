'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from 'react-icons/ai'
import { FaStickyNote } from 'react-icons/fa'
import { actionTypes, prioTypes, prioIcons } from '@/utils/todoTypes'

const TodoItem = ({ todo, onEditableId, onEdit, onDelete, onOpenNote }) => {
  const [ curTodo, setCurTodo ] = useState(todo);
  const { editableTodoId } = useSelector(state => state.todo)
  const IsEditable = editableTodoId === curTodo._id;

  const handleInputChange = (e) => {
    setCurTodo({ ...curTodo, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    const updatedTodo = { ...curTodo, status: !curTodo.status };
    setCurTodo(updatedTodo);
    onEdit(curTodo._id, updatedTodo);
  }

  return (
    <>
      <tr key={curTodo._id} className="border-t text-center">
        {/* ------------- task --------------*/}
        <td className="table_row">
          {IsEditable ? (
            <input
              className="text_input"
              type="text"
              name="title"
              style={{ color: '#ffffff' }}
              value={curTodo.title}
              onChange={(e) => handleInputChange(e)}
            />
          ) : (
            curTodo.title
          )}
        </td>
        {/* ------------- priority --------------*/}
        <td className="table_row">
          {IsEditable ? (
            <select
              className="text_input text-white"
              name="priority"
              style={{ color: '#ffffff' }}
              value={curTodo.priority}
              onChange={(e) => handleInputChange(e)}
            >
              <option value={ 1 }>{ prioTypes[1] }</option>
              <option value={ 2 }>{ prioTypes[2] }</option>
              <option value={ 3 }>{ prioTypes[3] }</option>
              <option value={ 4 }>{ prioTypes[4] }</option>
            </select>
          ) : (
            prioIcons[curTodo.priority]
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
            checked={curTodo.status === true}
            onChange={ handleCheckboxChange }
          />
        </td>
        {/* ------------- Date --------------*/}
        {/*<td className="table_row">{curTodo.createdAt}</td>*/}
        {/* ------------- Add note--------------*/}
        <td className="table_row">
          <button className="outline_btn" onClick={ () => onOpenNote(curTodo._id) }>
            <FaStickyNote />
          </button>
        </td>
        {/* ------------- Edit --------------*/}
        <td className="table_row">
          {IsEditable ? (
            <button className="outline_btn " onClick={ () => onEdit(curTodo._id, curTodo)}>
              <AiOutlineSave />
            </button>
          ) : (
            <button className="outline_btn flex justify-center" onClick={ () => onEditableId(curTodo._id) }>
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
    </>
  );
};

export default TodoItem;
