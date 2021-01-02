import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ()=>{
    const dispatch = useDispatch()
    return <div>
        Filter <input onChange={(e)=>{console.log(e.target.value);dispatch(setFilter(e.target.value))}}/>
    </div>
}

export default Filter