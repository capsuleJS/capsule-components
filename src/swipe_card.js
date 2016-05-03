//in progress
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class SwipeCard extends Component {
  constructor() {
    super()
    this.state = {
      trigger: false,
      prevPos: {x: 0, y: 0},
      currPos: {x: 0, y: 0},
      boundary: null,
      zone: null,
      cardStyle: {
        top: 0,
        left: 0,
        transform: 'rotate(0deg)',
        transition: 'transform 100ms'
      }
    }
    this.boundMouseUpHandler = this.mouseUpHandler.bind(this)
    this.boundMouseMoveHandler = this.mouseMoveHandler.bind(this)
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }    // Event stopping utility

  addHandlers() {         // Listeners added on drag start
    document.addEventListener('mousemove', this.boundMouseMoveHandler)
    document.addEventListener('touchmove', this.boundMouseMoveHandler)
    document.addEventListener('mouseup', this.boundMouseUpHandler)
    document.addEventListener('touchend', this.boundMouseUpHandler)
  }

  removeHandlers() {      // Listeners removed after drag
    document.removeEventListener('mousemove', this.boundMouseMoveHandler)
    document.removeEventListener('touchmove', this.boundMouseMoveHandler)
    document.removeEventListener('mouseup', this.boundMouseUpHandler)
    document.removeEventListener('touchend', this.boundMouseUpHandler)
  }

  mouseDownHandler(e){
    if(e) this.stop(e)
    console.log(e.currentTarget.getBoundingClientRect());
      this.setState({
        boundary: e.currentTarget.getBoundingClientRect(),
        prevPos: {
          y: e.touches !== undefined ? e.touches[0].clientY : e.clientY,
          x: e.touches !== undefined ? e.touches[0].clientX : e.clientX
        }
      })
      this.addHandlers()
    }

  mouseUpHandler(e){
    console.log("inside mouse up")
    if(this.state.trigger){
      if(this.props.onLeft && this.state.zone[1] === 'left') this.props.onLeft()
      if(this.props.onRight && this.state.zone[1] === 'right') this.props.onRight()
    }
    this.setState({
      cardStyle: {
        top: 0,
        left: 0,
        transform: 'rotate(0deg)',
        transition: 'transform '+ this.props.snap || 500 +'ms'
      }
    })
    this.removeHandlers()
  }

  mouseMoveHandler(e){
    let x1 = this.state.prevPos.x
    let y1 = this.state.prevPos.y
    let x2 = e.touches !== undefined ? e.touches[0].clientX : e.clientX
    let y2 = e.touches !== undefined ? e.touches[0].clientY : e.clientY
    this.setState({
      zone: this.setDragPos(x1, y1, x2, y2),
      trigger: (y2 < this.state.boundary.top ||
      y2 > this.state.boundary.bottom ||
      x2 < this.state.boundary.left   ||
      x2 > this.state.boundary.right)
    })
  }

  setDragPos(x1, y1, x2, y2){
    let xDiff = x1 - x2
    let yDiff = y1 - y2
    let multiplier = ((xDiff >= 0 && yDiff >= 0) || (xDiff < 0 && yDiff < 0)) ? 1 : -1
    let ratio = Math.abs(xDiff/ (xDiff > 0 ? x1 : window.innerWidth - x1) )
    let angle = multiplier * ratio * 45
    this.setState({
      cardStyle: {
        top: y2 - y1,
        left: x2 - x1,
        transform: 'rotate(' + angle + 'deg)',
        transition: 'transform '+ this.props.smooth || 100 +'ms'
      }
    })
    if (yDiff > 0) {
      return angle < 0 ? ["top","right"] : ["top","left"]
    } else if (yDiff < 0){
      return angle > 0 ? ["bottom","right"] : ["bottom","left"]
    }
  }

  render() {
    return (
      <div>
            <div style={{borderWidth: 3,
              borderRadius: 3,
              borderStyle: 'solid',
              borderColor: '#000',
              position: 'absolute',
              width: '200px',
              height: '300px',
              position: 'absolute', ...this.state.cardStyle}} onMouseDownCapture={this.mouseDownHandler.bind(this)}
              onTouchStartCapture={this.mouseDownHandler.bind(this)}>
            Text in card
            </div>
      </div>
    )
  }
}

export default SwipeCard

/*-------- Testing --------*/

// ReactDOM.render(
//   <div style={{
//     borderWidth: 3,
//     borderRadius: 3,
//     borderStyle: 'solid',
//     borderColor: '#000',
//     position: 'absolute',
//     width: '200px',
//     height: '300px',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     margin: 'auto'
//   }}>
//     <SwipeCard threshold={20} onLeft={() => {console.log('onLeft firing!')}} onRight={() => {console.log('onRight firing!')}}/>
//   </div>,
//   document.querySelector('#container')
// )
