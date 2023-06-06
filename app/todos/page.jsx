'use client'
import React, {useEffect, useState } from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoFilter from '@/components/TodoFilter';
import TodoNote from "@/components/TodoNote";
import ProgressBar from "@/components/ProgressBar";
import Pagination from "@/components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditableTodo,
  editTodo,
  deleteTodo,
  createTodo,
  getAllTodosWithFeatures,
  getCompletedTodosCount,
  addNote,
  openModal,
  closeModal,
  getTodoById
} from "@/redux/actions/todoActions";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const TodosPage = () => {
  const dispatch = useDispatch()
  const [ sortedField, setSortedField ] = useState(null);
  const [ note, setNote] = useState('')
  const { todoList, showModal, addNoteTodoId,
    currentTodo, loading, doneTodoCount, total } = useSelector(state => state.todo)
  const { data: session, status } = useSession()
  const router = useRouter();
  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/')
    }
  }, [status]);

  useEffect(() => {
    dispatch( getAllTodosWithFeatures() )
  }, [])

  useEffect(() => {
    dispatch( getCompletedTodosCount() )
  }, [doneTodoCount])

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

  const progress = todoList?.length > 0 ? parseFloat((( doneTodoCount/total ) * 100).toFixed(1)) : 0
  return (
    <>
      { status === 'authenticated' && <div className="todo-page">
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
        <ProgressBar progress = { progress }/>
        <TodoForm addTodo={ handleAdd }/>
        <TodoFilter />
        <TodoList todos={ todoList }
                  sortedField={ sortedField }
                  onDelete={ handleDelete }
                  onEditableId = { handleEditableId }
                  onEdit={ handleEdit }
                  onSort={ handleSort }
                  onOpenNote = { handleOpenNote } />
        <Pagination onPaginationChange={ handlePagination } />
      </div>}
    </>

  );
};

export default TodosPage;
