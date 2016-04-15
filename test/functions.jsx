import React, { Component } from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'
import { expect } from 'chai'

import ReactTimeout from '..'

describe('Functions', () => {

  class Plain extends Component {
    constructor () {
      super()
    }
    render = () => {
      const {
        setTimeout,
        setInterval,
        setImmediate,
        requestAnimationFrame,
        clearTimeout,
        clearInterval,
        clearImmediate,
        cancelAnimationFrame
      } = this.props
      return (
        <div>
          <p className="setTimeout">{typeof setTimeout}</p>
          <p className="setInterval">{typeof setInterval}</p>
          <p className="setImmediate">{typeof setImmediate}</p>
          <p className="requestAnimationFrame">{typeof requestAnimationFrame}</p>
          <p className="clearTimeout">{typeof clearTimeout}</p>
          <p className="clearInterval">{typeof clearInterval}</p>
          <p className="clearImmediate">{typeof clearImmediate}</p>
          <p className="cancelAnimationFrame">{typeof cancelAnimationFrame}</p>
        </div>
      )
    }
  }
  const Timed = ReactTimeout(Plain)
  const rendering = renderIntoDocument( <Timed /> )

  it('has setTimeout', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'setTimeout')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has setInterval', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'setInterval')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has setImmediate', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'setImmediate')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has requestAnimationFrame', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'requestAnimationFrame')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has clearTimeout', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'clearTimeout')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has clearInterval', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'clearInterval')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has clearImmediate', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'clearImmediate')[0]
    expect(q.textContent).to.equal('function')
  })

  it('has cancelAnimationFrame', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'cancelAnimationFrame')[0]
    expect(q.textContent).to.equal('function')
  })

})
