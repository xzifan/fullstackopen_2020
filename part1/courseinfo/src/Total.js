import React from 'react'
import ReactDOM from 'react-dom'

class Total extends React.Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        return (
            <p>Number of exercises {this.props.exercises1 + this.props.exercises2 + this.props.exercises3}</p>
        )
    }
        
}

export default Total;