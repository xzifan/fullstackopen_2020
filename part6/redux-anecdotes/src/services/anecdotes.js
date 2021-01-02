import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'
const getAll = async () =>{
    const res = await axios.get(baseURL)
    return res.data
}
const get = async (id)=>{
    const res = await axios.get(baseURL+'/'+id)
    return res.data
}
const create = async (content) => {
    const obj = { content, votes:0}
    const res = await axios.post(baseURL,obj)
    return res.data
}
const vote = async (id) => {
    const item = await get(id)
    const res = await axios.put(baseURL+'/'+id,{...item,votes:item.votes+1})
    return res.data
}
export default {
    get, getAll, create, vote
}