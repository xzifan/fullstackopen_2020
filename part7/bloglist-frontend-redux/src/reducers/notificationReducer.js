const notificationReducer = (state={type:'',content:''},action)=>{

    switch (action.type) {
        case 'SETNOTIFICATION':
            clearTimeout(state.timer)
            console.log(action,state)
            return action.data
        case 'RESET_NOTIFICATION':
            return {type:'',content:''}
        default:
            return state
    }
}

export const set = (type,content,time=5) =>{
    console.log('reducer - notification:',type,content)
    return async dispatch =>{
        dispatch({
            type:'SETNOTIFICATION',
            data:{
                content,
                type,
                timer:setTimeout(() => {
                    dispatch(reset())
                }, time*1000)
            }
        })
    }
}
export const reset = () =>{
    return {
        type:'RESET_NOTIFICATION'
    }
}

export default notificationReducer