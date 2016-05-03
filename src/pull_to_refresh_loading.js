import React, {Component} from 'react'

class Loading extends Component {
  constructor(){
    super()
    this.state = {
      rotation: 0
    }
  }

  releasePTR(){
    let interval = setInterval(() => {
      console.log('rotating')
      this.setState({rotation: (6 + this.state.rotation)%360})
    }, 16.66)
    setTimeout(() => {
      this.props.release()
      clearInterval(interval)
      this.setState({rotation: 0})
    }, 2000)
  }

  render() {
    return (
      <div style={{ ...this.props.style }}>
        <div style={{
            height: '64px',
            width: '64px',
            margin: '18px auto',
            opacity: this.props.progress / 100,
            transform: `rotate(${this.state.rotation}deg)`
          }}>
          <svg width='64px' height='64px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'>
            <rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(0 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(30 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(60 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(90 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(120 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(150 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(180 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(210 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(240 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(270 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(300 50 50) translate(0 -30)'>
            </rect>
            <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(330 50 50) translate(0 -30)'>
            </rect>
          </svg>
        </div>
      </div>
    )
  }
}

export default Loading
