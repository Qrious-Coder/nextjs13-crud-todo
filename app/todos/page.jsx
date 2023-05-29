'use client'
import React, {useEffect, useState } from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoFilter from '@/components/TodoFilter';
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditableTodo,
  editTodo,
  deleteTodo,
  createTodo,
  getAllTodosWithFeatures,
  addNote,
  openModal
} from "@/redux/actions/todoActions";

const TodosPage = () => {
  const [ note, setNote] = useState('')
  const dispatch = useDispatch()
  const { todoList } = useSelector( state => state.todo )
  const { showModal, addNoteTodoId, curPage, limit } = useSelector(state => state.todo)

  useEffect(() => {
    dispatch( getAllTodosWithFeatures() )
  }, [])

  const handleDelete = async (id) => {
    dispatch(deleteTodo(id))
  };

  const handleEditableId = async (id) => {
    dispatch(setEditableTodo(id))
  };

  const handleEdit = (id, todo) => {
    dispatch(editTodo(id, todo))
  };

  const handleAdd = async (formData) => {
    dispatch(createTodo(formData))
  };

  const handleSort = (sortBy) => {
    dispatch(getAllTodosWithFeatures(null,null, sortBy))
  }

  const handleOpenNote = async (id) => {
    dispatch(openModal(id))
  };

  const handleSave =(id, note) => {
    dispatch(addNote( id, note ))
  }

  const handlePagination = ( currentPage, limitPerPage  ) => {
    dispatch(getAllTodosWithFeatures(null, null, null, currentPage, limitPerPage))
  }

  return (
    <div className="todo-page">
      <Modal isOpen={ showModal }
             onSave={ () => handleSave( addNoteTodoId, note) }>
        <textarea
          className="p-2 mb-4 w-full h-full outline-none resize-none"
          value={ note }
          placeholder={`Note something...`}
          onChange={(e) => setNote(e.target.value)}
        />
      </Modal>
      <TodoForm addTodo={ handleAdd }/>
      <TodoFilter />
      <TodoList todos={ todoList }
                onDelete={ handleDelete }
                onEditableId = { handleEditableId }
                onEdit={ handleEdit }
                onSort={ handleSort }
                onOpenNote = { handleOpenNote }
      />
      <Pagination onPaginationChange={ handlePagination } />
    </div>
  );
};

export default TodosPage;
