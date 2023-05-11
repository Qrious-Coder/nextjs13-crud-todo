'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import { editTodo } from '@/redux/actions/todoActions';

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

  return (
    <tr key={curTodo._id} className="border-t">
      <td className="py-2 px-4 text-center border border-gradient">
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
      <td className="py-2 px-4 text-center border border-gradient">
        {editable ? (
          <select
            className="text_input"
            name="priority"
            value={curTodo.priority}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="NOT important and NOT urgent">NOT important and NOT urgent</option>
            <option value="Important and urgent">Important and urgent</option>
            <option value="Important but NOT urgent">Important but NOT urgent</option>
            <option value="NOT important but urgent">NOT important but urgent</option>
          </select>
        ) : (
          curTodo.priority
        )}
      </td>
      <td className="py-2 px-4 text-center border border-gradient">
        <input
          className="text_input"
          type="checkbox"
          checked={curTodo.completed}
          onChange={() => onEdit(curTodo._id, { completed: !curTodo.completed })}
        />
      </td>
      <td className="py-2 px-4 text-center border border-gradient">{curTodo.createdAt}</td>
      <td className="py-2 px-4 text-center border border-gradient">
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
      <td className="py-2 px-4 text-center border border-gradient">
        <button className="outline_btn flex justify-center" onClick={() => onDelete(curTodo._id)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
