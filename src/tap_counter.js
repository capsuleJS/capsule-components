//in progress
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class TapCounter extends Component {
  constructor(){
    super()
    this.state = {
      counter: 0,
      finalCounter: 0,
      timeout: null
    }
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }

  mouseDownHandler(e){
    if(e) this.stop(e)
    if(!this.state.timeout){
      this.setState({timeout: setTimeout(() => {this.setState({timeout: null, finalCounter: this.state.counter, counter: 0})}, this.props.wait)})
    }
    if(this.state.timeout){
      this.setState({counter: this.state.counter + 1})
    }
  }

  render() {
    return (
      <div onMouseDownCapture={()=>this.mouseDownHandler()}>
      {this.state.counter}
      {this.state.finalCounter}
      </div>
    )
  }
}

export default TapCounter

/*-------- Testing --------*/

// ReactDOM.render(
//   <TapCounter wait={1000}>
//   </TapCounter>,
//   document.querySelector('#container')
// )
