import React from 'react'
import ReactDOM from 'react-dom'

class Header extends React.Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        return (
            <h1>{this.props.course}</h1>
        )
    }
        
}

export default Header;