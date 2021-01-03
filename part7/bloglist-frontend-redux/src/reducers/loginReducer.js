import blogService from '../services/blogs'

const loggedUserJSON = JSON.parse(
    window.localStorage.getItem('loggedUser'),
)
var initialState = null
if (loggedUserJSON){
    blogService.setToken(loggedUserJSON.token)
    initialState = loggedUserJSON
}  

const loginReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (username,password)=>{
    return async dispatch => {
        const user = await blogService.login({username,password})
        console.log(user)
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )
        dispatch({type:'LOGIN',data:user})
    }
}

export const logout = ()=>{
    return async dispatch => {
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
        dispatch({type:'LOGOUT'})
    }
}

export default loginReducer