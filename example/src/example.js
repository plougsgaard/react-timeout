import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'

let router = (component) => () => {
  React.render(component, document.body)
}

@ReactTimeout
class Ninja extends Component {
  constructor (props) {
    super(props)
    this.startTimer = this.startTimer.bind(this)
  }
  startTimer () {
    const { setTimeout } = this.props.reactTimeout
    const id = setTimeout(() => { console.log(`${id} - end`) }, 5000)
    console.log(`${id} - begin`)
  }
  render () {
    return (
      <div>
        <button onClick={ router(<Turtle />) }>Mount Turtle</button>
        <button onClick={ this.startTimer }>Start Timer</button>
      </div>
    )
  }
}

class Turtle extends Component {
  render () {
    return (
      <div>
        <button onClick={ router(<Mutant />) }>Mount Mutant</button>
      </div>
    )
  }
}

@ReactTimeout
class Mutant extends Component {
  constructor (props) {
    super(props)
    this.startTimer = this.startTimer.bind(this)
  }
  startTimer () {
    const { setTimeout } = this.props.reactTimeout
    const id = setTimeout(() => { console.log(`${id} - end`) }, 5000)
    console.log(`${id} - begin`)
  }
  render () {
    return (
      <div>
        <button onClick={ router(<Ninja />) }>Mount Ninja</button>
        <button onClick={ this.startTimer }>Start Timer</button>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', router(<Ninja />))
