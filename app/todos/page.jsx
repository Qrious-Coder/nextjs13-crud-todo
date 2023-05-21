'use client'
import {useEffect, useState} from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Nav from "@/components/Nav";
import { useSelector, useDispatch } from "react-redux";
import {getAllTodos, editTodo, deleteTodo, createTodo, getAllTodosWithFeatures} from "@/redux/actions/todoActions";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import { saveAccessToken } from '@/utils/token'

const TodosPage = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const { todoList } = useSelector( state => state.todo )
  const { data: session, status } = useSession()

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

  const handleEdit = (id, data) => {
    dispatch(editTodo(id, data))
  };

  const handleAdd = async (formData) => {
    dispatch(createTodo(formData))
  };

  if (status === 'loading') {
    return <div>Loading ...</div>;
  }
  return (
    <div className="todo-page">
      {/*<h1>AccessToken: {accessToken}</h1>*/}
      <Nav session={ session }/>
      <TodoForm addTodo={ handleAdd }/>
      <TodoList todos={ todoList } onDelete={ handleDelete } onEdit={ handleEdit }/>
    </div>
  );
};

export default TodosPage;
