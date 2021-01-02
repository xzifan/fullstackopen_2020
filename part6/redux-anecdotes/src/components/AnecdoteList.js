import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ()=>{
    const {anecdotes,filter} = useSelector(({anecdotes, filter})=>{return {anecdotes,filter}})
    const dispatch = useDispatch()
    const vote = (id, content) => {
        dispatch(voteFor(id))
        dispatch(setNotification(`You voted '${content}'`,3))
    }
    return (
        <div>
            {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote => {
                if (anecdote.content.toString().indexOf(filter)!==-1)
                    return (<div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>)
                return ''
            })}
        </div>
    )
}

export default AnecdoteList