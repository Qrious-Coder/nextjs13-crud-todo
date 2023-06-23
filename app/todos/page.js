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
  getTodoById, closeEntryModal, searchTodo,
} from "@/redux/actions/todoActions";
import { useRouter } from "next/navigation";
import { useIsLogin } from "@/utils/useIsLogin";
import useWinWidth from "@/utils/useWinWidth";

const TodosPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLogin = useIsLogin()
  const [ sortedField, setSortedField ] = useState(null)
  const [ note, setNote] = useState('')
  const [ isDemo, setIsDemo ] = useState(null)

  const { todoList, showModal, showNote, addNoteTodoId,
    currentTodo, loading, doneTodoCount, total } = useSelector(state => state.todo)
  const screenWidth = useWinWidth();
  const isSmallScreen = screenWidth < 1000;
  useEffect(() => {
    if(isLogin !== null) { // run this effect only when isLogin is not null
      setIsDemo(!isLogin)
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
    isDemo ? dispatch(openEntryModal()) : dispatch(deleteTodo(id))
  };

  const handleEditableId = async (id) => {
    isDemo ? dispatch(openEntryModal()) :  dispatch(setEditableTodo(id))
  };

  const handleEdit = (id, todo ) => {
    isDemo ? dispatch(openEntryModal()) : dispatch(editTodo(id, todo))
  };

  const handleAdd = (formData) => {
    isDemo ? dispatch(openEntryModal()) : dispatch(createTodo(formData))
  };

  const handleSearchTodo = (title) => {
    if (title.trim() === '') {
      isDemo ? dispatch(getDemoTodos()):dispatch(getAllTodosWithFeatures())
    } else {
      dispatch(searchTodo(title));
    }
  }

  const handleSort = (sortBy) => {
    dispatch(getAllTodosWithFeatures(null,null, sortBy))
    setSortedField(sortBy);
  }

  const handleOpenNote = (id) => {
    if(isDemo){
      dispatch(openEntryModal())
    }else{
      dispatch(getTodoById(id))
      dispatch(openNote(id))
    }
  };

  const handleSave =(id, note) => {
    dispatch(addNote( id, note ))
    setNote('')
  }

  const handleClose =() => {
    dispatch(closeNote())
  }

  const handleModalOk = () => {
    router.push('./entry')
    dispatch(closeEntryModal())
  }

  const handleModalClose =() => {
    dispatch(closeEntryModal())
  }

  const handlePagination = ( currentPage, limitPerPage  ) => {
    dispatch(getAllTodosWithFeatures(null, null, null, currentPage, limitPerPage))
  }

  const progress = (total && total > 0) ?
    parseFloat((( doneTodoCount/total ) * 100).toFixed(1)) : 0;

  return (
  <div className="todo-page">
        <Modal show = { showModal }
           onOK = { handleModalOk }
           onClose = { handleModalClose }
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
        <TodoForm
          onAddTodo={ handleAdd }
          onSearch={ handleSearchTodo }
          isSmallScreen={ isSmallScreen }
        />
        <TodoFilter />
        <TodoList todos={ todoList }
          sortedField={ sortedField }
          onDelete={ handleDelete }
          onEditableId = { handleEditableId }
          onEdit={ handleEdit }
          onSort={ handleSort }
          onOpenNote = { handleOpenNote }
          isDemo = { isDemo }
          isSmallScreen = { isSmallScreen }
        />
        <Pagination onPaginationChange={ handlePagination } />
  </div>
  );
};

export default TodosPage;
