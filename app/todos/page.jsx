'use client'
import React, {useEffect, useState} from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoFilter from '@/components/TodoFilter';
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Nav from "@/components/Nav";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTodos,
  editTodo,
  deleteTodo,
  createTodo,
  getAllTodosWithFeatures,
  closeModal, addNote
} from "@/redux/actions/todoActions";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import { saveAccessToken } from '@/utils/token'


const TodosPage = () => {
  const [ note, setNote] = useState('')
  const dispatch = useDispatch()
  const router = useRouter();
  const { todoList } = useSelector( state => state.todo )
  const { data: session, status } = useSession()
  const { showModal, addNoteTodoId } = useSelector(state => state.todo)

  console.log(`showModal:`, showModal)

  useEffect(()=>{
    if(status === 'authenticated'){
      // dispatch(getAllTodos())
      dispatch(getAllTodosWithFeatures())
      saveAccessToken(session?.session.accessToken)
    }else{
      router.push('/')
    }
  }, [session])


  const handleDelete = async (id) => {
    dispatch(deleteTodo(id))
  };

  const handleEdit = (id, todo) => {
    dispatch(editTodo(id, todo))
  };

  const handleAdd = async (formData) => {
    dispatch(createTodo(formData))
  };

  // const handleFilter = (filter) => {
  //   dispatch(getAllTodosWithFeatures(filter));
  // };

  if (status === 'loading') {
    return <div>Loading ...</div>;
  }
  return (
    <div className="todo-page">
      <Nav session={ session }/>
      <Modal isOpen={ showModal }
             onSave={ () => { dispatch(addNote( addNoteTodoId, note )) }}>
        <textarea
          className="p-2 mb-4 w-full h-full outline-none resize-none"
          value={ note }
          placeholder={`Note something...`}
          onChange={(e) => setNote(e.target.value)}
        />
      </Modal>
      <TodoForm addTodo={ handleAdd }/>
      <TodoFilter />
      <TodoList todos={ todoList } onDelete={ handleDelete }
                onEdit={ handleEdit }
        // onFilter={handleFilter}
      />
      <Pagination />
    </div>
  );
};

export default TodosPage;
