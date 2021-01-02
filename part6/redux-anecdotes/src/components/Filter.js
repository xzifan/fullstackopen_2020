import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ()=>{
    const dispatch = useDispatch()
    return <div>
        Filter <input onChange={(e)=>{console.log(e.target.value);dispatch(setFilter(e.target.value))}}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        notification: state.notification
    }
}
const ConnectedFilter= connect(mapStateToProps)(Filter)
export default ConnectedFilter