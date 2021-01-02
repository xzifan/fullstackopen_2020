import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, resetNotification} from '../reducers/notificationReducer'

const Form = () => {
    const dispatch = useDispatch()
    const add = async (e) =>{
        e.preventDefault()
        dispatch(addAnecdote(e.target.content.value))
        dispatch(setNotification(`new anecdote '${e.target.content.value}'`))
        e.target.content.value = ''
        setTimeout(() => {
            dispatch(resetNotification())
          }, 5000)
        
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}
const ConnectedForm = connect(mapStateToProps)(Form)
export default ConnectedForm