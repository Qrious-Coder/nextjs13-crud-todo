'use client'
import {useEffect} from 'react';
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos, editTodo, deleteTodo, createTodo } from "@/redux/actions/todoActions";

const TodosPage = () => {
  const dispatch = useDispatch()
  const { todoList } = useSelector( state => state.todo )

  useEffect(()=>{
    dispatch(getAllTodos())
  }, [dispatch])

  const handleDelete = async (id) => {
    dispatch(deleteTodo(id))
  };

  const handleEdit = (id, data) => {
    dispatch(editTodo(id, data))
  };

  const handleAdd = async (formData) => {
    dispatch(createTodo(formData))
  };


  return (
    <>
      <TodoForm addTodo={ handleAdd }/>
      <TodoList todos={ todoList } onDelete={ handleDelete } onEdit={ handleEdit }/>
    </>
  );
};

export default TodosPage;
