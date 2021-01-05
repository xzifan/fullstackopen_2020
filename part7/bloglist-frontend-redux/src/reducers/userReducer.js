import blogService from '../services/blogs'

const userReducer = (state=[],action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'ALL_USERS':
            return action.data  
        default:
            return state
    }
}

export const getUsers = ()=>{
    return async dispatch =>{
        const users = await blogService.allUsers()
        console.log('init users',users)
        dispatch({
            type:'ALL_USERS',
            data: users
        })
    }
}

export default userReducer
