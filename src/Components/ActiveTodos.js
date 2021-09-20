import { ThemeContext } from "./Header"
import { TodosContext } from "./AddTodo"
import { useContext } from "react"

export const ActiveTodos = () => {

    const themeContext = useContext(ThemeContext)

    const todosContext = useContext(TodosContext)

    return (
        <div id = "active_todos_container">
        {todosContext.activeTodos.map(todoItem => {
            if (todosContext.activeTodos.id === 0) {
                return (
                    <div className={`item_container ${themeContext.todoListClassName}`} style={{ justifyContent: 'center' }} key = {todoItem.id}>
                        {todoItem.name}
                    </div>
                )
            }
            else {
                return (
                    <div className={`item_container ${themeContext.todoListClassName}`} style = {{justifyContent: 'center'}} key = {todoItem.id}>
                        {todoItem.name}
                    </div>
                )
            }
        })
    }
        </div>
    )
}