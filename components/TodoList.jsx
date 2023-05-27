'use client'
import React, { useState} from 'react';
import TodoItem from './TodoItem'
import TodoFilter from './TodoFilter'
import { tabHeaderData } from '@/utils/todoData'
import { useDispatch, useSelector  } from 'react-redux'
import { getAllTodosWithFeatures} from '@/redux/actions/todoActions'
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

const TodoList = ({ todos, onDelete, onEdit }) => {
  const dispatch = useDispatch()

  const handleSort = (sortBy) => {
      dispatch(getAllTodosWithFeatures(null,null, sortBy))
  }
  return (
    <>
      {/*-----------filter----------------*/}
      <TodoFilter />
      {/*-----------table----------------*/}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900 text-white">
            { tabHeaderData.map( (item,idx) => {
                return (
                  <th key={ idx } className="py-2 px-4 border border-purple-500 text-purple-500">
                    <div className={`flex items-center justify-${item.position}`}>
                      <div>
                        <span className="text-3xl text-blue-500">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                      { item.sort && <span className="flex flex-col">
                          <button className="border-purple-500"
                            onClick = { () => handleSort(`-${item.text}`) }>
                            { item.sortUpIc }
                          </button>
                          <button className="border-purple-500"
                            onClick = { () => handleSort(`${item.text}`) }>
                          { item.sortDownIc }
                          </button>
                        </span> }
                      </div>
                    </div>
                  </th>
                )})
            }
          </tr>
        </thead>
        <tbody>
        {todos.map((todo) => (
          <TodoItem
            todo = { todo }
            key = { todo._id }
            onDelete = { onDelete }
            onEdit = { onEdit }
          />
        ))}
        </tbody>
      </table>
      {/*-----------filter----------------*/}
      <Pagination />
    </>

  );
};

export default TodoList;
