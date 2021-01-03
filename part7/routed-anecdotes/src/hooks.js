import { useState } from 'react'

export const useAnecdoteForm = (anecdotes) => {
    const [content, setContent] = useState('')
    const [info, setInfo] = useState('')
    const [author, setAuthor] = useState('')

    const onChange = (e) => {
        switch (e.target.name) {
            case 'content':
                setContent(e.target.value)
                break;
            case 'info':
                setInfo(e.target.value)
                break;
            case 'author':
                setAuthor(e.target.value)
                break;
            default:
                break;
        }
    }
    const clearForm = () =>{
        setAuthor('')
        setContent('')
        setInfo('')
    }
    return { anecdotes, content, info, author, onChange, clearForm }
}