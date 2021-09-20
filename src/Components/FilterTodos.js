import React, { useContext, useState } from "react"
import { ActiveTodos } from "./ActiveTodos"
import { Todos } from "./Todos"
import { CompletedTodos } from "./CompletedTodos"
import { ThemeContext } from "./Header"
import { TodosContext } from "./AddTodo"

export const FilterTodos = () => {

    const themeContext = useContext(ThemeContext)

    const todosContext = useContext(TodosContext)

    const itemsLeft = todosContext.activeTodos[0].id === 0 ? "No item(s) left" : todosContext.activeTodos.length + " item(s) left"

    const [isTrue, setIsTrue] = useState(true)

    const [currentActiveState, setCurrentActiveState] = useState(null)

    const [allActiveState, setAllActiveState] = useState(true)
    const [activeActiveState, setActiveActiveState] = useState(false)
    const [completedActiveState, setCompletedActiveState] = useState(false)

    const handleClick = (number) => {
        switch (number) {

            case 1:
                setCurrentActiveState(null)
                setIsTrue(true)
                setAllActiveState(true)
                setActiveActiveState(false)
                setCompletedActiveState(false)
                document.getElementById('drag_todos').style.display = "revert"
                break;

            case 2:
                setCurrentActiveState(<ActiveTodos />)
                setIsTrue(false)
                setAllActiveState(false)
                setActiveActiveState(true)
                setCompletedActiveState(false)
                document.getElementById('drag_todos').style.display = "none"
                break;

            case 3:
                setCurrentActiveState(<CompletedTodos />)
                setIsTrue(false)
                setAllActiveState(false)
                setActiveActiveState(false)
                setCompletedActiveState(true)
                document.getElementById('drag_todos').style.display = "none"
                break;
            default:
                setCurrentActiveState(null)
                setIsTrue(true)
        }
    }

    const clearCompleted = () => {
        if (todosContext.checkedTodos[0].id !== 0) {
            if (todosContext.todoList.length === 1) {
                todosContext.setTodoList([{ id: 0, name: 'No todos to show' }])
            }
            else {
                todosContext.setTodoList(todosContext.activeTodos)
            }
            todosContext.setCheckedTodos([{ id: 0, name: 'No completed todos' }])
        }
    }

    return (
        <React.Fragment>
            <div id="filter_main">

                {isTrue ?
                    <Todos /> : currentActiveState
                }

                <div id="filter_todos_container" className={themeContext.filterTodosClassName}>
                    <div id="items_left">
                        {itemsLeft}
                    </div>
                    <div id="filter_todos" className={`${themeContext.filterTodosHoverClassName} filter_todos_default`}>

                        <div id="all" className={`filters ${allActiveState ? 'active' : null}`} onClick={() => handleClick(1)}>
                            All
                        </div>

                        <div id="active" className={`filters ${activeActiveState ? 'active' : null}`} onClick={() => handleClick(2)}>
                            Active
                        </div>

                        <div id="completed" className={`filters ${completedActiveState ? 'active' : null}`} onClick={() => handleClick(3)}>
                            Completed
                        </div>

                    </div>

                    <div id="clear_completed" className={themeContext.filterTodosHoverClassName} onClick={clearCompleted}>
                        Clear Completed
                    </div>
                </div>

                {/* For mobiles */}

                <div id="filter_todos" className={`${themeContext.filterTodosHoverClassName} ${themeContext.filterTodosMediaClassName} filter_todos_media `}>

                    <div id="all" className={`filters ${allActiveState ? 'active' : null}`} onClick={() => handleClick(1)}>
                        All
                    </div>

                    <div id="active" className={`filters ${activeActiveState ? 'active' : null}`} onClick={() => handleClick(2)}>
                        Active
                    </div>

                    <div id="completed" className={`filters ${completedActiveState ? 'active' : null}`} onClick={() => handleClick(3)}>
                        Completed
                    </div>

                </div>

                <div id ="drag_todos" >Drag the todos to reorder</div>
            </div>
        </React.Fragment>
    )
}