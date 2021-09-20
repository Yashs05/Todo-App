import { ThemeContext } from "./Header"
import { TodosContext } from "./AddTodo"
import { useContext } from "react"

export const CompletedTodos = () => {

    const themeContext = useContext(ThemeContext)

    const todosContext = useContext(TodosContext)

    return (
        <div id="active_todos_container">
            {todosContext.checkedTodos.map(todoItem => {
                if (todosContext.checkedTodos[0].id === 0) {
                    return (
                        <div className={`item_container ${themeContext.todoListClassName}`} style={{ justifyContent: 'center' }} key = {todoItem.id}>
                            {todoItem.name}
                        </div>
                    )
                } else {
                    return (
                        <div className={`item_container ${themeContext.todoListClassName}`} style={{ justifyContent: 'center', alignItems: 'center' }} key = {todoItem.id}>
                            {todoItem.name}
                        </div>
                    )
                }
            })
            }
        </div>
    )
}