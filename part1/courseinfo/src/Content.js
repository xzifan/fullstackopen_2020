import React from 'react'
import ReactDOM from 'react-dom'

class Content extends React.Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        return (
            <div>
                <p>
                    {this.props.part1} {this.props.exercises1}
                </p>
                <p>
                    {this.props.part2} {this.props.exercises2}
                </p>
                <p>
                    {this.props.part3} {this.props.exercises3}
                </p>
            </div>
        )
    }
        
}

export default Content;