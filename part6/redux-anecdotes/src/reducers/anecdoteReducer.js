import anecdoteService from '../services/anecdotes'
const anecdoteReducer = (state = [], action) => {
    // console.log('anecdoteReducer',state,action)
    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            const itemToVote = state.find(n => n.id===id)
            const changedItem = { 
                ...itemToVote,
                votes:itemToVote.votes+1
              }
            return state.map(item =>
                item.id === id ? changedItem : item 
              )
        case 'ADD':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }

}

export const voteFor = (id)=>{
    return async dispatch => {
        await anecdoteService.vote(id)
        dispatch({
            type: 'VOTE',
            data: { id }
          })
    }
}
export const initialize = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}
export const addAnecdote = (data)=>{
    return async dispatch => {
        const newItem = await anecdoteService.create(data)
        dispatch({
            type:'ADD',
            newItem
        })
    }
}
export default anecdoteReducer