import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class HoldToTrigger extends Component {
  constructor(){
    super()
    this.state = {
      isTouched: false,
      isTriggered: false,
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

  activate(){
    this.setState({isTriggered: true})
    if(this.props.auto){
      console.log('calling callback due to auto equalling true')
    }
  }

  mouseDownHandler(e){
    if(e) this.stop(e)
    this.setState({isTouched: true})
    console.log("inside mouseDownHandler")
    this.setState({timeout : setTimeout(() => {this.activate()}, this.props.wait)})
    this.addHandlers()
  }

  mouseUpHandler(e){
    this.setState({isTouched: false})
    clearTimeout(this.state.timeout)
    if(this.state.isTriggered && !this.props.auto){
      console.log("calling callback in mouseUpHandler")
    } else {
      console.log("trigger function cancelled")
    }
  }

  render() {
    return (
      <div style={{
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        background: 'gray',
        border: '2px solid blue',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto'
      }}
      onMouseDownCapture={this.mouseDownHandler.bind(this)}
      onTouchStartCapture={this.mouseDownHandler.bind(this)}>
        {React.cloneElement(this.props.children, {
          ...this.props.children.props,
          isTouched: this.state.isTouched,
          isTriggered: this.state.isTriggered,
          wait: this.props.wait
        })}
      </div>
    )
  }
}

export default HoldToTrigger


/*-------- Testing --------*/

// ReactDOM.render(
//   <HoldToTrigger wait={2000} auto={true}>
//     <Reactor/>
//   </HoldToTrigger>,
//   document.querySelector('#container')
// )
