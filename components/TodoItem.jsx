'use client'
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from 'react-icons/ai';
import { editTodo } from '@/redux/actions/todoActions';

const TodoItem = ({ todo, onEdit, onDelete }) => {
    const dispatch = useDispatch()
    const [ editableTodoId, setEditableTodoId ] = useState('')
    const [ curTodo, setCurTodo ] = useState(todo)
    const editable = editableTodoId === curTodo._id 

    const handleInputChange = (e) => {
        setCurTodo({...curTodo, [e.targe.name]: e.target.name})
    }

    const handleSave = (id, todo) => {
        dispatch(editTodo(id, todo))
        setEditableTodoId(null)
    }

    const handleEdit =(id) => {
        setEditableTodoId(id)
    }

    return(
        <tr key={curTodo._id} className="border-t">
          {/*<td className="py-2 px-4 text-center border border-gradient">{todo._id}</td>*/}
          <td className="py-2 px-4 text-center border border-gradient">
            {
                editable ?
                (<input 
                    type='text'
                    name='title'
                    value={ curTodo.title}
                    onChange={ e => handleInputChange(e)}
                />)
                :( curTodo.title )
            }
            </td>
          <td className="py-2 px-4 text-center border border-gradient">
            {
                  editable ?
                  (<input 
                      type='text'
                      name='description'
                      value={ curTodo.description}
                      onChange={ e => handleInputChange(e)}
                  />)
                : (curTodo.description)
            }
            </td>
          <td className="py-2 px-4 text-center border border-gradient">
            <input
              type="checkbox"
              checked={curTodo.completed}
              onChange={() => onEdit(curTodo._id, { completed: !curTodo.completed })}
            />
          </td>
          <td className="py-2 px-4 text-center border border-gradient">{curTodo.createAt}</td>
          <td className="py-2 px-4 text-center border border-gradient">
          {editable ? 
            <button className="outline_btn flex justify-center" onClick={() => handleSave(curTodo._id, todo)}>
                <AiOutlineSave />
            </button> :
            <button className="outline_btn flex justify-center" onClick={() => handleEdit(curTodo._id)}>
                <AiOutlineEdit />
            </button> 
            }
          </td>
          <td className="py-2 px-4 text-center border border-gradient">
            <button className="outline_btn flex justify-center" onClick={() => onDelete(curTodo._id)}>
              <AiOutlineDelete />
            </button>
          </td>
        </tr>
    )
}