import React, { useContext, useEffect } from "react"
import check from "../images/icon-check.svg"
import { ThemeContext } from "./Header"
import { TodosContext } from "./AddTodo"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const Todos = () => {

    const themeContext = useContext(ThemeContext)

    const todosContext = useContext(TodosContext)

    const setTodoList = (todo, checked) => {
        if (todosContext.todoList.length === 1) {
            todosContext.setTodoList([{ id: 0, name: 'No todos to show' }])
        }

        else {
            todosContext.setTodoList(todosContext.todoList.filter(
                item => item.id !== todo.id
            ))
        }

        if (!checked) {
            if (todosContext.activeTodos.length === 1) {
                todosContext.setActiveTodos([{ id: 0, name: 'No active todos' }])
            }
            else {
                todosContext.setActiveTodos(todosContext.activeTodos.filter(
                    item => item.id !== todo.id
                ))
            }
        }

        if (checked) {
            if (todosContext.checkedTodos.length === 1) {
                todosContext.setCheckedTodos([{ id: 0, name: 'No completed todos' }])
            }
            else {
                todosContext.setCheckedTodos(todosContext.checkedTodos.filter(
                    item => todo.id !== item.id))
            }
        }
    }

    const setActiveTodos = (todo, checked) => {
        if (todosContext.activeTodos[0].id === 0) {
            if (!checked) {
                todosContext.setActiveTodos([{ id: 0, name: 'No active todos' }])
            }
            else {
                todosContext.setActiveTodos(prev => [{ id: todo.id, name: todo.name }])
            }
        }

        else {
            if (!checked) {
                if (todosContext.activeTodos.length === 1) {
                    todosContext.setActiveTodos([{ id: 0, name: 'No active todos' }])
                }
                else {
                    todosContext.setActiveTodos(todosContext.activeTodos.filter(
                        item => todo.id !== item.id
                    ))
                }
            }
            else {
                todosContext.setActiveTodos(prev => [...prev, { id: todo.id, name: todo.name }])
            }
        }
    }


    const setCheckedTodosList = (todo, checked) => {
        if (checked) {
            if (todosContext.checkedTodos.length === 1) {
                todosContext.setCheckedTodos([{ id: 0, name: 'No completed todos' }])
            } else {
                todosContext.setCheckedTodos(todosContext.checkedTodos.filter(item => todo.id !== item.id))
            }
        } else {
            if (todosContext.checkedTodos[0].id === 0) {
                todosContext.setCheckedTodos([{ id: todo.id, name: todo.name }])
            }
            else {
                todosContext.setCheckedTodos([...todosContext.checkedTodos, { id: todo.id, name: todo.name }])
            }
        }
    }

    useEffect(() => {
        todosContext.activeTodos.sort(function (a, b) { return a.id - b.id })
        todosContext.checkedTodos.sort(function (a, b) { return a.id - b.id })
    }
    )

    return (
            <DragDropContext onDragEnd={(param) => {
                const srcIndex = param.source.index
                const destIndex = param.destination?.index
                if (destIndex !== null) {
                    todosContext.todoList.splice(destIndex, 0, todosContext.todoList.splice(srcIndex, 1)[0])
                    localStorage.setItem('Todos', JSON.stringify(todosContext.todoList))
                }
            }
            }>

                <Droppable droppableId='droppable-1'>
                    {(provided) => (
                        <div id="todos_container" ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                todosContext.todoList.map((todoItem, i) => {
                                    if (todosContext.todoList[0].id === 0) {
                                        return (
                                            <div className={`item_container ${themeContext.todoListClassName}`} style={{ justifyContent: 'center' }} key={todoItem.id}>
                                                {todosContext.todoList[0].name}
                                            </div>
                                        )
                                    } else {
                                        const checked = todosContext.checkedTodos.some(item => item.id === todoItem.id)
                                        return (
                                            <Draggable key={todoItem.id} draggableId={'draggable' + todoItem.id} index={i}>
                                                {(provided, snapshot) => (

                                                    <div className={`item_container ${themeContext.todoListClassName}`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ ...provided.draggableProps.style, borderRadius: snapshot.isDragging ? '5px' : null }}>

                                                        <button type='button' className={`check_button ${themeContext.inputClassName} ${checked ? 'checked' : 'not_checked'}`}
                                                            onClick={() => { setActiveTodos(todoItem, checked); setCheckedTodosList(todoItem, checked) }}>
                                                            <img src={check} alt="" class="check_img"></img>
                                                        </button>

                                                        <ul>
                                                            <li id="li_item" className={checked ? 'checked_item' : 'not_checked_item'} >
                                                                {todoItem.name}
                                                            </li>
                                                        </ul>
                                                        <i className="material-icons close_icon"
                                                            onClick={() => { setTodoList(todoItem, checked) }}>clear</i>
                                                    </div>
                                                )
                                                }
                                            </Draggable>
                                        )
                                    }
                                }
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext>
    )
}