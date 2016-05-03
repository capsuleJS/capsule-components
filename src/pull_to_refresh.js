import React, {Component} from 'react'

class PullToRefresh extends Component {
  constructor() {
    super()
    this.state = {
      isTouched: false,   // Whether the user is currently changing the position of the content div
      toTrigger: false,   // Whether the content div has passed the threshold
      progress: 0,        // % value of threshold that that the user has pulled passed
      prevY: 0,           // Distance of user pointer from top of content div
      nextY: 0,           // Where the top of the content div should be while pulled
      transition: 'none', // If released, the content div is given a smooth transition
      trigger: false      // Switch to cause the child component to trigger
    }
    this.boundMouseUpHandler = this.mouseUpHandler.bind(this)     // Release handler (named for disposal)
    this.boundMouseMoveHandler = this.mouseMoveHandler.bind(this) // Pull handler
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }             // Event stopping utility

  addHandlers() {         // Listeners added on pull start
    document.addEventListener('mousemove', this.boundMouseMoveHandler)
    document.addEventListener('touchmove', this.boundMouseMoveHandler)
    document.addEventListener('mouseup', this.boundMouseUpHandler)
    document.addEventListener('touchend', this.boundMouseUpHandler)
  }

  removeHandlers() {      // Listeners removed after pull
    document.removeEventListener('mousemove', this.boundMouseMoveHandler)
    document.removeEventListener('touchmove', this.boundMouseMoveHandler)
    document.removeEventListener('mouseup', this.boundMouseUpHandler)
    document.removeEventListener('touchend', this.boundMouseUpHandler)
  }

  mouseDownHandler(e) {
    if(e) this.stop(e)
    // If the target is the listener or the target is a designated PTR-target...
    if(e.target === e.currentTarget || e.target.classList.contains('pull-to-refresh-target')){
      if(this.props.onPullStart) this.props.onPullStart()
      this.setState({
        isTouched: true,                                              // The content div is being touched
        prevY: e.currentTarget.offsetTop - (e.touches !== undefined ? // The pointer position is captured
          e.touches[0].clientY :                                      // Check for touch vs mouse
          e.clientY),
        transition: 'none'                                            // Fail-safe removal of transition
      })
      this.addHandlers()
    }
  }

  mouseMoveHandler(e) {
    if(e) this.stop(e)
    // Perform move handling only if the content div is being touched and it hasn't crossed limits
    if(this.state.isTouched === true && this.state.nextY <= this.props.limit && this.state.nextY >= 0) {
      this.setState({
        nextY: Math.min(                                              // Updated the pull position
          this.state.prevY + (e.touches !== undefined ?
            e.touches[0].clientY :
            e.clientY),
          this.props.limit),                                          // Calculate the progress
        progress: Math.floor(Math.min(this.state.nextY / this.props.threshold * 100, 100))
      })
      if(this.props.onPull) this.props.onPull(this.state.progress)    // Call any callbacks
      // If the threshold has been passed, the refresh is primed
      if(this.state.nextY >= this.props.threshold) this.setState({ toTrigger: true })
      // If the position drops below the threshold, the trigger is deactivated
      if(this.state.nextY < this.props.threshold) this.setState({ toTrigger: false })
    }
  }

  mouseUpHandler(e) {
    if(e) this.stop(e)
    this.setState({
      nextY: this.state.toTrigger ? this.props.threshold : 0,       // If triggered, defer to release
      transition: `top ${this.props.snap}ms`                          // Smooth-scroll to position
    })
    setTimeout(() => {  // Wait for animation before running callback or setting props
      if(this.props.onPullEnd) this.props.onPullEnd(this.state.toTrigger)
      if(this.state.toTrigger) {                                        // Trigger the callbacks
        if(this.refs &&                                                 // if refs are present use them
          this.refs.pullToRefreshLoading &&
          this.refs.pullToRefreshLoading.releasePTR)
          this.refs.pullToRefreshLoading.releasePTR()
        if(this.refs &&                                                 // if refs are present use them
          this.refs.pullToRefreshContent &&
          this.refs.pullToRefreshContent.releasePTR)
          his.refs.pullToRefreshContent.releasePTR()
        this.setState({ trigger: true })                           // Otherwise just trigger prop
      }
    }, this.props.snap)
    this.removeHandlers()
  }

  release() {
    if(this.state.trigger === true)         // This resets the state after the children have released it
      this.setState({
        isTouched: false,
        nextY: 0,
        progress: 0,
        trigger: false
      })                  // Complete smooth scroll from threshold to 0
    setTimeout(() => this.setState({ transition: 'none', toTrigger: false }), this.props.snap)
  }

  render() {
    const sizes = { width: '100%', minHeight: `${this.props.limit}px`}
    const el1 = React.cloneElement(this.props.children[0], {
      ...this.props.children[0].props,
      style: {
        position: 'absolute',
        top: 0,
        ...this.props.children[0].props.style, ...sizes
      },
      progress: this.state.progress,
      position: this.state.nextY,
      threshold: this.props.threshold,
      release: this.release.bind(this),
      trigger: this.state.trigger,
      ref: 'pullToRefreshLoading'
    })
    const el2 = React.cloneElement(this.props.children[1], {
      ...this.props.children[1].props,
      style: {
        position: 'relative',
        top: this.state.nextY || 0,
        transition: this.state.transition,
        cursor: 'pointer',
        ...this.props.children[1].props.style, ...sizes
      },
      progress: this.state.progress,
      position: this.state.nextY,
      threshold: this.props.threshold,
      release: this.release.bind(this),
      trigger: this.state.trigger,
      ref: 'pullToRefreshContent',
      onMouseDownCapture: (e) => this.mouseDownHandler(e),
      onTouchStartCapture: (e) => this.mouseDownHandler(e)
    })
    return (
      <div style={{ width: '100%', height: '100%', ...this.props.style }}>
        {/* IDEA: Allow users to select which element is in the foreground */}
        {/*(this.props.foreground === true) ? el2 : el1*/}
        {/*(this.props.foreground === true) ? el1 : el2*/}
        {el1}{el2}
      </div>
    )
  }
}

export default PullToRefresh
