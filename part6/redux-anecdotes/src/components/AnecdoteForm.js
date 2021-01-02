import React from 'react'
import { useDispatch } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'


const Form = () => {
    const dispatch = useDispatch()
    const add = (e) =>{
        e.preventDefault()
        dispatch(addAnecdote(e.target.content.value))
        e.target.content.value = ''
    }
    
    return (
       <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='content'/></div>
                <button type='submit'>create</button>
            </form>
       </div>
    )
}

export default Form