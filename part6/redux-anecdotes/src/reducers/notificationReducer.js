const notificationReducer = (state = '', action)=>{
    // console.log('notificationReducer',state,action)
    if (action.type ==='SET')
        return action.notification
    else if (action.type === 'RESET')
        return ''
       
    return state
}
export const setNotification = (notification,time=5)=>{
    return async (dispatch) =>{
        dispatch({
            type: 'SET',
            notification
        })
        setTimeout(() => {
            dispatch(resetNotification())
        }, time*1000)
    }
}
export const resetNotification = ()=>{
    return {
        type:'RESET'
    }
}
export default notificationReducer