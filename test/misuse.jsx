import React, { Component } from 'react'
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils'
import { expect } from 'chai'

import ReactTimeout from '..'

window.misuse__uglyMutableLeakyVariableTest = 'pass'

window.onerror = function () {
  window.misuse__uglyMutableLeakyVariableTest = 'fail'
  return true // prevent error bubbling
}

describe('Misuse', () => {

  class Plain extends Component {
    constructor () {
      super()
    }
    test0 = () => {
      this.props.setTimeout()
    }
    test1 = () => {
      this.props.setTimeout('not a function')
    }
    test2 = () => {
      this.props.setTimeout(null)
      this.props.setTimeout({})
      this.props.setTimeout(undefined)
      this.props.setTimeout(NaN)
      this.props.setTimeout(() => {}, null)
      this.props.setTimeout(() => {}, {})
      this.props.setTimeout(() => {}, undefined)
      this.props.setTimeout(() => {}, NaN)
    }
    test3 = () => {
      this.props.setTimeout(() => {
        window.misuse__uglyMutableLeakyVariableTest = 'negatory'
      }, -5000)
    }
    render = () => {
      return (
        <div>
          <button className="test0" onClick={this.test0}>test0</button>
          <button className="test1" onClick={this.test1}>test1</button>
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
    window.misuse__uglyMutableLeakyVariableTest = 'pass'
  })

  it('can be called with no arguments without crashing', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test0')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.misuse__uglyMutableLeakyVariableTest).to.equal('pass')
      setTimeout(done)
    }, 50)
  })

  it('can be called with a string without crashing', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test1')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.misuse__uglyMutableLeakyVariableTest).to.equal('pass')
      setTimeout(done)
    }, 50)
  })

  it('can be called with a lot of crap without crashing', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test2')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.misuse__uglyMutableLeakyVariableTest).to.equal('pass')
      setTimeout(done)
    }, 50)
  })

  it('can be called with a negative number (which defaults to 0)', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test3')[0]
    Simulate.click(b)
    setTimeout(() => {
      expect(window.misuse__uglyMutableLeakyVariableTest).to.equal('negatory')
      setTimeout(done)
    }, 50)
  })

})
