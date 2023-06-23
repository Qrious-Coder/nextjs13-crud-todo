'use client'
import React from 'react'
import TodoItem from './TodoItem'
import { tabHeaderData } from '@/utils/todoData'
import { TfiWrite } from 'react-icons/tfi'

const TodoList = ({ todos, onDelete, onEdit, onSort, isDemo,
                    onEditableId,  onOpenNote, sortedField, isSmallScreen }) => {
  const filteredTabHeaderData = tabHeaderData.filter(item => !isSmallScreen || item.smallScreen );
  const iconSize = isSmallScreen ? '0.8em' : '1em';
  return (
    <>
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-900 outline text-indigo-500 outline-offset outline-indigo-500
          rounded-md divide-indigo-500 divide-x divide-dashed">
          { filteredTabHeaderData.map((item,idx) => {
            const isSortingByThisField = sortedField === item.text || sortedField === `-${item.text}`;
            return (
              <th key={idx} className="py-2 px-4" style={{ width: item.width(isSmallScreen) }}>
                <div className={`flex items-center justify-${item.position}`}>
                  <div>
                    <span className="text-3xl text-blue-500">
                      { item.icon(iconSize)}
                    </span>
                  </div>
                  {<div>
                    { !isSmallScreen && item.sort &&
                      <span className="flex flex-col">
                        <button
                          className={`${isSortingByThisField && sortedField === `-${item.text}` ? 'text-blue-500' : ''}`}
                          onClick={() => onSort(`-${item.text}`)}
                        >
                          { item.sortUpIc }
                        </button>
                        <button
                          className={`${isSortingByThisField && sortedField === `${item.text}` ? 'text-blue-500' : ''}`}
                          onClick={() => onSort(`${item.text}`)}
                        >
                          { item.sortDownIc }
                        </button>
                      </span>
                    }
                  </div>}
                </div>
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {todos?.length === 0 ? (
          <tr className="bg-gray-800 text-gray-500 opacity-2 border-x border-b border-dashed border-indigo-500">
            <td colSpan={tabHeaderData.length} className="text-center py-5">
              <TfiWrite className="mx-auto text-3xl mb-4" />
              Currently you have nothing todo...
            </td>
          </tr>
        ) : (
          todos?.map((todo) => (
            <TodoItem
              todo = { todo }
              key = { todo._id }
              onDelete = { onDelete }
              onEditableId = { onEditableId }
              onEdit = { onEdit }
              onOpenNote = { onOpenNote }
              isDemo = { isDemo }
              isSmallScreen = { isSmallScreen }
            />
          ))
        )}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
