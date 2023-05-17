'use client'
import {useEffect} from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Nav from "@/components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos, editTodo, deleteTodo, createTodo } from "@/redux/actions/todoActions";
import {useSession} from "next-auth/react";

const TodosPage = () => {
  const dispatch = useDispatch()
  const { todoList } = useSelector( state => state.todo )
  const { data: session, status } = useSession()

  // console.log(`session:`, session)
  useEffect(()=>{
    if(status === 'authenticated'){
      dispatch(getAllTodos())
    }
  }, [session, status])

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
      <Nav session={ session }/>
      <TodoForm addTodo={ handleAdd }/>
      <TodoList todos={ todoList } onDelete={ handleDelete } onEdit={ handleEdit }/>
    </div>
  );
};

export default TodosPage;
