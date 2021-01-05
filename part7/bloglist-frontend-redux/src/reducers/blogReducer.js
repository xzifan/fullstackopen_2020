import blogService from '../services/blogs'

const blogReducer = (state = [], action)=>{
    switch (action.type) {
        case 'ADD':
            return [...state,action.data]
        case 'DELETE':
            const res = state.filter(blog=>blog.id!==action.data)
            return res
        case 'LIKE':
            const target = state.find(blog=> blog.id===action.data.id)
            const updatedTaget = {...target,likes:target.likes+1}
            return state.map(item=>
                item.id === action.data.id ? updatedTaget : item 
            )
        case'INIT':
            return action.data
        default:
            return state
    }
}

export const deleteBlog=(id)=>{
    return async dispatch =>{
        await blogService.remove(id)
        dispatch({
            type:'DELETE',
            data:id
        })
    }
}

export const addBlog=(blog)=>{
    return async dispatch =>{
        const newBlog = await blogService.create(blog)
        dispatch({
            type:'ADD',
            data:newBlog
        })
    }
}
export const likeBlog= (id,updated)=>{
    return async dispatch =>{
        await blogService.update(id,updated)
        dispatch({
            type:'LIKE',
            data:{id,updated}
        })
    }
}
export const init = ()=>{
    console.log('init')
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('init',blogs)
        dispatch({
            type: 'INIT',
            data: blogs,
        })
    }
}
export default blogReducer