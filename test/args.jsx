import React, { Component } from 'react'
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils'
import { expect } from 'chai'

import ReactTimeout from '..'

window.args__uglyMutableLeakyVariableTest2 = 'none'
window.args__uglyMutableLeakyVariableTest3 = 'none'

describe('Args', () => {

  class Plain extends Component {
    constructor () {
      super()
      this.state = {
        status: 'none'
      }
    }
    test2 = () => {
      this.props.setTimeout((arg1) => {
        window.args__uglyMutableLeakyVariableTest2 = arg1
      }, 100, 'arg1')
    }
    test3 = () => {
      this.props.setTimeout((arg1, arg2, arg3) => {
        window.args__uglyMutableLeakyVariableTest3 = arg3
      }, 100, 'arg1', 'arg2', 'arg3')
    }
    render = () => {
      const { status } = this.state
      return (
        <div>
          <p className="status">{status}</p>
          <button className="test2" onClick={this.test2}>test2</button>
          <button className="test3" onClick={this.test3}>test3</button>
        </div>
      )
    }
  }
  const Timed = ReactTimeout(Plain)
  let rendering

  beforeEach(() => {
    rendering = renderIntoDocument( <Timed /> )
  })

  it('can pass one argument to setTimeout', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test2')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.args__uglyMutableLeakyVariableTest2).to.equal('arg1')
      setTimeout(done)
    }, 300)
  })

  it('can pass several arguments to setTimeout', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test3')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.args__uglyMutableLeakyVariableTest3).to.equal('arg3')
      setTimeout(done)
    }, 300)
  })

})
