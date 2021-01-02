const notificationReducer = (state = '', action)=>{
    // console.log('notificationReducer',state,action)
    if (action.type ==='SET'){
        return action.notification
    }else if (action.type === 'RESET')
        return ''
       
    return state
}
export const setNotification = (notification)=>{
    return {
        type: 'SET',
        notification
    }
}
export const resetNotification = ()=>{
    return {
        type:'RESET'
    }
}
export default notificationReducer