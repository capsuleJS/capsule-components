import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Reactor extends Component {

  render(){
    return (
      <div style={{
        opacity: this.props.isTouched ? 1 : 0,
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        background: this.props.isTriggered ? 'red' : 'black',
        border: '2px solid blue',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        transition: `opacity ${this.props.wait}ms`
      }}>
      </div>
    )
  }
}

export default Reactor
