import React, { useEffect, useState } from 'react'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = (props)=>{
    const [anecdotes,setAnecdotes] = useState(props.store.getState())
    const vote = (id) => {
        console.log(props.store.getState())
        props.store.dispatch(voteFor(id))
        setAnecdotes(props.store.getState())
    }
    return (
        <div>
            {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList