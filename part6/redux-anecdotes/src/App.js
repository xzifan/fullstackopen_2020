import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
    const store = createStore(anecdoteReducer)
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList store={store}/>
            <AnecdoteForm store={store}/>
        </div>
    )
}

export default App