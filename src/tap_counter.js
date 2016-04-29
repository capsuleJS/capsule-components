//in progress
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class TapCounter extends Component {
  constructor(){
    super()
    this.state = {
      counter: 0,
      timeout: null
    }
    this.boundMouseUpHandler = this.mouseUpHandler.bind(this)
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }

  addHandlers() {
    document.addEventListener('mouseup', this.boundMouseUpHandler)
    document.addEventListener('touchend', this.boundMouseUpHandler)
  }

  removeHandlers() {
    document.removeEventListener('mouseup', this.boundMouseUpHandler)
    document.removeEventListener('touchend', this.boundMouseUpHandler)
  }

  mouseDownHandler(e){
    if(e) this.stop(e)
    if(!this.state.timeout){
      this.setState({isTouched: true, timeout: setTimeout(() => {this.setState({timeout: null})}, this.props.wait)})
    }
    if(this.state.timeout)
  }

  mouseUpHandler(e){

  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

/*-------- Testing --------*/

ReactDOM.render(
  <TapCounter wait={}>
  </TapCounter>,
  document.querySelector('#container')
)
