'use client'
import React from 'react';
import TodoItem from './TodoItem'
import { tabHeaderData } from '@/utils/todoData'

const TodoList = ({ todos, onDelete, onEdit, onSort, onEditableId,  onOpenNote, sortedField}) => {
  const clearSort = () => onSort(null);

  return (
    <>
      <button onClick={clearSort}>Clear Sort</button>
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-900 text-white">
          { tabHeaderData.map((item,idx) => {
            const isSortingByThisField = sortedField === item.text || sortedField === `-${item.text}`;
            return (
              <th key={idx} className="py-2 px-4 border border-purple-500 text-purple-500">
                <div className={`flex items-center justify-${item.position}`}>
                  <div>
                    <span className="text-3xl text-blue-500">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    {item.sort &&
                      <span className="flex flex-col">
                        <button
                          className={`${isSortingByThisField && sortedField === `-${item.text}` ? 'text-blue-500' : ''}`}
                          onClick={() => onSort(`-${item.text}`)}
                        >
                          {item.sortUpIc}
                        </button>
                        <button
                          className={`${isSortingByThisField && sortedField === `${item.text}` ? 'text-blue-500' : ''}`}
                          onClick={() => onSort(`${item.text}`)}
                        >
                          {item.sortDownIc}
                        </button>
                      </span>
                    }
                  </div>
                </div>
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {todos.map((todo) => (
          <TodoItem
            todo = { todo }
            key = { todo._id }
            onDelete = { onDelete }
            onEditableId = { onEditableId }
            onEdit = { onEdit }
            onOpenNote = { onOpenNote }
          />
        ))}
        </tbody>
      </table>
      <style jsx>{`
        .text-red-500 {
          color: red; // refactor later
        }
      `}</style>
    </>
  );
};

export default TodoList;
