import moonLogo from '../images/icon-moon.svg'
import sunLogo from '../images/icon-sun.svg'
import '../App.css'
import { AddTodo } from './AddTodo'
import React, { useState } from 'react'

export const ThemeContext = React.createContext()

export const Header = () => {

    const [theme, setTheme] = useState({
        theme: 'light', topHeaderClassName: "top_header_light", inputContainerClassName: 'input_container_light',
        inputClassName: 'input_light', todoListClassName: 'todo_list_light', filterTodosClassName: 'filter_todos_light',
        filterTodosMediaClassName: 'filter_todos_media_light', filterTodosHoverClassName: 'filter_todos_hover_light'
    })

    const toggleTheme = () => {
        if (theme.theme === "light") {
            setTheme({
                theme: 'dark', topHeaderClassName: "top_header_dark", inputContainerClassName: 'input_container_dark',
                inputClassName: 'input_dark', todoListClassName: 'todo_list_dark', filterTodosClassName: 'filter_todos_dark',
                filterTodosMediaClassName: 'filter_todos_media_dark' ,filterTodosHoverClassName: 'filter_todos_hover_dark'
            })
            document.querySelector('body').style.backgroundColor = 'hsl(235, 24%, 19%)'
            document.getElementById('toggle_image').src = sunLogo
        } else {
            setTheme({
                theme: 'light', topHeaderClassName: "top_header_light", inputContainerClassName: 'input_container_light',
                inputClassName: 'input_light', todoListClassName: 'todo_list_light', filterTodosClassName: 'filter_todos_light',
                filterTodosMediaClassName: 'filter_todos_media_light', filterTodosHoverClassName: 'filter_todos_hover_light'
            })
            document.getElementById('toggle_image').src = moonLogo
            document.querySelector('body').style.backgroundColor = 'hsl(236, 33%, 92%)'

        }
    }

    return (
        <ThemeContext.Provider value = {theme} >
        <div className={theme.topHeaderClassName}>
            <div id='header_desc'>
                <h1 id="heading" title="Todo">TODO</h1>
                <img src={moonLogo} alt="" title="Toggle Theme" onClick={toggleTheme} id="toggle_image" />
            </div>
            <AddTodo />
        </div>
        </ThemeContext.Provider>
    )
}