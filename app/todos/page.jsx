'use client'
import React, {useEffect, useState } from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoFilter from '@/components/TodoFilter';
import Clock from '@/components/Clock';
import TodoNote from "@/components/TodoNote";
import Pagination from "@/components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditableTodo,
  editTodo,
  deleteTodo,
  createTodo,
  getAllTodosWithFeatures,
  addNote,
  openModal,
  closeModal,
  getTodoById
} from "@/redux/actions/todoActions";

const TodosPage = () => {
  const [sortedField, setSortedField] = useState(null);
  const [ note, setNote] = useState('')
  const dispatch = useDispatch()
  const { todoList } = useSelector( state => state.todo )
  const { showModal, addNoteTodoId, currentTodo, loading } = useSelector(state => state.todo)

  useEffect(() => {
    dispatch( getAllTodosWithFeatures() )
  }, [])

  useEffect(() => {
    if(currentTodo) {
      setNote( currentTodo.note )
    }
  }, [currentTodo])

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
    setSortedField(sortBy); // update the sortedField state
  }

  const handleOpenNote = async (id) => {
    dispatch(getTodoById(id))
    dispatch(openModal(id))
  };

  //AI suggested to useCallBack
  // const handleSave = useCallback( () => {
  //   dispatch(addNote(id, note))
  //   setNote('')
  // }, [dispatch])

  const handleSave =(id, note) => {
    dispatch(addNote( id, note ))
    setNote('')
  }

  const handleClose =() => {
    dispatch(closeModal())
  }

  const handlePagination = ( currentPage, limitPerPage  ) => {
    dispatch(getAllTodosWithFeatures(null, null, null, currentPage, limitPerPage))
  }

  return (
    <div className="todo-page">
      <TodoNote isOpen={ showModal }
                onSave={ () => handleSave( addNoteTodoId, note) }
                onClose={ handleClose }
      >
        { !loading && <textarea
          className="p-2 mb-4 w-full h-full outline-none resize-none"
          value={ note }
          placeholder={`Note something...`}
          onChange={(e) => setNote(e.target.value)}
        /> } 
      </TodoNote>
      <TodoForm addTodo={ handleAdd }/>
      <TodoFilter />
      <TodoList todos={ todoList }
                sortedField={sortedField}
                onDelete={ handleDelete }
                onEditableId = { handleEditableId }
                onEdit={ handleEdit }
                onSort={ handleSort }
                onOpenNote = { handleOpenNote } />
      <Pagination onPaginationChange={ handlePagination } />
    </div>
  );
};

export default TodosPage;
