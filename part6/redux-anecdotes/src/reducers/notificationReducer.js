const notificationReducer = (state = '', action)=>{
    // console.log('notificationReducer',state,action)
    if (action.type ==='SET'){
        clearTimeout(state.timer)
        return action.data
    }
    else if (action.type === 'RESET')
        return ''
       
    return state
}
export const setNotification = (notification,time=5)=>{
    return async (dispatch) =>{
        dispatch({
            type: 'SET',
            data:{
                content:notification,
                timer:setTimeout(() => {
                        dispatch(resetNotification())
                    }, time*1000)
            }
        })
    }
}
export const resetNotification = ()=>{
    return {
        type:'RESET'
    }
}
export default notificationReducer