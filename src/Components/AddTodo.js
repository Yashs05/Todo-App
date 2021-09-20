import React, { useContext, useEffect, useState } from "react"
import check from "../images/icon-check.svg"
import '../App.css'
import { FilterTodos } from "./FilterTodos"
import { ThemeContext } from "./Header"

export const TodosContext = React.createContext()

export const AddTodo = () => {

    let initTodos = [{ id: 0, name: 'No todos to show' }]

    let initActiveTodos = [{ id: 0, name: 'No active todos' }]

    let initCheckedTodos = [{ id: 0, name: 'No completed todos' }]

    if (localStorage.getItem('Todos') === null) {
        initTodos = [{ id: 0, name: 'No todos to show' }]
    }
    else {
        initTodos = JSON.parse(localStorage.getItem('Todos'))
    }

    if (localStorage.getItem('activeTodos') === null) {
        initActiveTodos = [{ id: 0, name: 'No active todos' }]
    }
    else {
        initActiveTodos = JSON.parse(localStorage.getItem('activeTodos'))
    }
    if (localStorage.getItem('checkedTodos') === null) {
        initCheckedTodos = [{ id: 0, name: 'No completed todos' }]
    }
    else {
        initCheckedTodos = JSON.parse(localStorage.getItem('checkedTodos'))
    }

    const theme = useContext(ThemeContext)

    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState(initTodos)
    const [activeTodos, setActiveTodos] = useState(initActiveTodos)
    const [checkedTodos, setCheckedTodos] = useState(initCheckedTodos)

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const handleClick = () => {

        let crrntTime = new Date().getTime()

        if (todo === "") {
            document.getElementById('addTodoAlert').style.opacity = '1'
            setTimeout(() => {
                document.getElementById('addTodoAlert').style.opacity = '0'
            }, 2000);
        }

        else if (!todo.trim()) {
            document.getElementById('addTodoAlert').style.opacity = '1'
            setTimeout(() => {
                document.getElementById('addTodoAlert').style.opacity = '0'
            }, 2000);
        }

        else {
            document.getElementById('checkButton').style.background = "linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"

            setTimeout(() => {
                document.getElementById('checkButton').style.background = "unset"
            }, 200)

            document.getElementById('input').value = ""

            if (todoList[0].id === 0) {
                setTodoList([{ id: crrntTime, name: todo }])
            }
            else {
                setTodoList(prev => [...prev, { id: crrntTime, name: todo }])
            }

            if (activeTodos[0].id === 0) {
                setActiveTodos([{ id: crrntTime, name: todo }])
            }
            else {
                setActiveTodos(prev => [...prev, { id: crrntTime, name: todo }])
            }

            setTodo("")
        }
    }

    const handleKeyUp = (event) => {

        let crrntTime = new Date().getTime()

        if (event.key === 'Enter') {

            if (todo === "") {
                document.getElementById('addTodoAlert').style.opacity = '1'
                setTimeout(() => {
                    document.getElementById('addTodoAlert').style.opacity = '0'
                }, 2000);
            }

            else if (!todo.trim()) {
                document.getElementById('addTodoAlert').style.opacity = '1'
                setTimeout(() => {
                    document.getElementById('addTodoAlert').style.opacity = '0'
                }, 2000);
            }

            else {
                document.getElementById('checkButton').style.background = "linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"

                setTimeout(() => {
                    document.getElementById('checkButton').style.background = "unset"
                }, 200)

                document.getElementById('input').value = ""

                if (todoList[0].id === 0) {
                    setTodoList([{ id: crrntTime, name: todo }])
                }
                else {
                    setTodoList(prev => [...prev, { id: crrntTime, name: todo }])
                }

                if (activeTodos[0].id === 0) {
                    setActiveTodos([{ id: crrntTime, name: todo }])
                }
                else {
                    setActiveTodos(prev => [...prev, { id: crrntTime, name: todo }])
                }

                setTodo("")
            }
        }
    }

    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(todoList))
    }, [todoList])

    useEffect(() => {
        localStorage.setItem('activeTodos', JSON.stringify(activeTodos))
    }, [activeTodos])

    useEffect(() => {
        localStorage.setItem('checkedTodos', JSON.stringify(checkedTodos))
    }, [checkedTodos])

    return (
        <TodosContext.Provider value={{ todoList, setTodoList, activeTodos, setActiveTodos, checkedTodos, setCheckedTodos }} >
            <React.Fragment>

                <div id="input_container" className={theme.inputContainerClassName}>
                    <button type='button' className={`check_button ${theme.inputClassName}`} onClick={handleClick} id="checkButton">
                        <img src={check} alt=""></img>
                    </button>
                    <input type="text" placeholder="Add a Todo.." id="input" className={theme.inputClassName} onChange={handleChange} onKeyUp={handleKeyUp}></input>
                    <div id="addTodoAlert">
                        <i className="material-icons" style={{ lineHeight: '17px', marginRight: '5px' }}>error_outline</i>
                        <span>Cannot leave this area empty</span>
                    </div>
                </div>

                <FilterTodos />

            </React.Fragment>
        </TodosContext.Provider>
    )
}
