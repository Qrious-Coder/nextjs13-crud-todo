'use client'
import {useEffect, useState} from 'react';
import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
const TodosPage = () => {
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    const fetchTodos =async() => {
      const res = await fetch(`/api/todos`)
      const data = await res.json()
      setTodos(data)
    }
    fetchTodos()

  }, [])

  const handleDelete = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    // TODO: update the todo list by refetching the data from the API
  };

  const handleEdit = async (id, data) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // TODO: update the todo list by refetching the data from the API
  };

  const handleAdd = async (formData) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Todo added:', data);
      } else {
        throw new Error('Failed to add todo');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <TodoForm addTodo={ handleAdd }/>
      <TodoList todos={ todos } onDelete={ handleDelete } onEdit={ handleEdit }/>
    </>
  );
};

export default TodosPage;