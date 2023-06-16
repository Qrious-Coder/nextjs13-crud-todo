'use client'
import React, {useEffect, useState } from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoFilter from '@/components/TodoFilter';
import TodoNote from "@/components/TodoNote";
import ProgressBar from "@/components/ProgressBar";
import Pagination from "@/components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/components/Modal";
import {
  setEditableTodo,
  editTodo,
  deleteTodo,
  createTodo,
  getDemoTodos,
  getAllTodosWithFeatures,
  getCompletedTodosCount,
  addNote,
  openNote,
  openEntryModal,
  closeNote,
  getTodoById, closeEntryModal,
} from "@/redux/actions/todoActions";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useIsLogin} from "@/utils/useIsLogin";

const TodosPage = () => {
  const dispatch = useDispatch()
  const [ sortedField, setSortedField ] = useState(null);
  const [ note, setNote] = useState('')
  const { todoList, showModal, showNote, addNoteTodoId,
    currentTodo, loading, doneTodoCount, total } = useSelector(state => state.todo)
  const [ isDemo, setIsDemo ] = useState(false)
  const router = useRouter();
  const isLogin = useIsLogin()

  useEffect(() => {
    if(isLogin){
      setIsDemo(true)
    }
  }, [isLogin])

  useEffect(() => {
    if(isDemo){
      dispatch(getDemoTodos())
    }else{
      dispatch(getAllTodosWithFeatures())
    }
  }, [isDemo])

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
    if(isLogin){
      dispatch(editTodo(id, todo))
    }else{
      dispatch(openEntryModal())
    }
  };

  const handleAdd = async (formData) => {
    dispatch(createTodo(formData))
  };

  const handleSort = (sortBy) => {
    dispatch(getAllTodosWithFeatures(null,null, sortBy))
    setSortedField(sortBy); // update the sortedField state
  }

  const handleOpenNote = async (id) => {
    if(isLogin){
      dispatch(getTodoById(id))
      dispatch(openNote(id))
    }else{
      dispatch(openEntryModal())
    }

  };

  const handleOpenEntryModal = async (id) => {
    dispatch(openEntryModal())
  };


  const handleSave =(id, note) => {
    dispatch(addNote( id, note ))
    setNote('')
  }

  const handleClose =() => {
    dispatch(closeNote())
  }

  const handleModalClose =() => {
    dispatch(closeEntryModal())
  }

  const handleModalOk = () => {
    router.push('./entry')
  }
  const handlePagination = ( currentPage, limitPerPage  ) => {
    dispatch(getAllTodosWithFeatures(null, null, null, currentPage, limitPerPage))
  }

  const progress = todoList?.length > 0 ? parseFloat((( doneTodoCount/total ) * 100).toFixed(1)) : 0
  return (
  <div className="todo-page">
        <Modal show = { showModal }
               onClose = { handleModalClose }
               onOK = { handleModalOk }
        />
        <TodoNote isOpen={ showNote }
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
                  openEntryModal = { handleOpenEntryModal }
        />
        <Pagination onPaginationChange={ handlePagination } />
  </div>
  );
};

export default TodosPage;
