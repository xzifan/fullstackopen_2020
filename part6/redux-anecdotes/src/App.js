import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import store from './store'

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList store={store}/>
            <AnecdoteForm store={store}/>
        </div>
    )
}

export default App