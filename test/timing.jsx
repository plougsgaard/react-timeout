import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils'
import { expect } from 'chai'

import ReactTimeout from '..'

window.uglyMutableLeakyVariableTest3 = 'none'
window.uglyMutableLeakyVariableTest4 = 'none'
window.uglyMutableLeakyVariableTest5 = 0

describe('Timing', () => {

  class Plain extends Component {
    constructor () {
      super()
      this.state = {
        status: 'none'
      }
    }
    test0 = () => {
      const { setTimeout } = this.props
      setTimeout(() => {
        this.setState({ status: 'test0' })
      })
    }
    test1 = () => {
      const { setTimeout, clearTimeout } = this.props
      const id = setTimeout(() => {
        this.setState({ status: 'test1' })
      })
      clearTimeout(id)
    }
    test2 = () => {
      const { setTimeout } = this.props
      setTimeout(() => {
        this.setState({ status: 'test2' })
      }, 250)
    }
    test3 = () => {
      const { setTimeout } = this.props
      setTimeout(() => {
        window.uglyMutableLeakyVariableTest3 = 'test3'
      }, 100)
    }
    test4 = () => {
      const { setTimeout } = this.props
      setTimeout(() => {
        window.uglyMutableLeakyVariableTest4 = 'test4'
      }, 250)
    }
    test5 = () => {
      const { setTimeout } = this.props
      setTimeout(() => {
        window.uglyMutableLeakyVariableTest5++
      }, 250)
    }
    render = () => {
      const { status } = this.state
      return (
        <div>
          <p className="status">{status}</p>
          <button className="test0" onClick={this.test0}>test0</button>
          <button className="test1" onClick={this.test1}>test1</button>
          <button className="test2" onClick={this.test2}>test2</button>
          <button className="test3" onClick={this.test3}>test3</button>
          <button className="test4" onClick={this.test4}>test4</button>
          <button className="test5" onClick={this.test5}>test5</button>
        </div>
      )
    }
  }
  const Timed = ReactTimeout(Plain)
  let rendering

  beforeEach(() => {
    rendering = renderIntoDocument( <Timed /> )
  })

  it('has not changed', () => {
    const q = scryRenderedDOMComponentsWithClass(rendering, 'status')[0]
    expect(q.textContent).to.equal('none')
  })

  it('fires immediately', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test0')[0]
    Simulate.click(b)

    setTimeout(() => {
      const q = scryRenderedDOMComponentsWithClass(rendering, 'status')[0]
      expect(q.textContent).to.equal('test0')
      setTimeout(done)
    })
  })

  it('is immediately cleared', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test1')[0]
    Simulate.click(b)

    setTimeout(() => {
      const q = scryRenderedDOMComponentsWithClass(rendering, 'status')[0]
      expect(q.textContent).to.equal('none')
      setTimeout(done)
    })
  })

  it('has not fired yet', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test2')[0]
    Simulate.click(b)

    setTimeout(() => {
      const q = scryRenderedDOMComponentsWithClass(rendering, 'status')[0]
      expect(q.textContent).to.equal('none')
      setTimeout(done)
    })
  })

  it('eventually mutates leaky variable', (done) => {
    const b = scryRenderedDOMComponentsWithClass(rendering, 'test3')[0]
    Simulate.click(b)

    expect(window.uglyMutableLeakyVariableTest3).to.equal('none')

    setTimeout(() => {
      expect(window.uglyMutableLeakyVariableTest3).to.equal('test3')
      setTimeout(done)
    }, 500)
  })

  it('is unmounted before it can fire', (done) => {
    const container = document.createElement('div')
    const newRendering = render(<Timed />, container)
    const b = scryRenderedDOMComponentsWithClass(newRendering, 'test4')[0]
    Simulate.click(b)

    setTimeout(() => unmountComponentAtNode(container), 10)

    setTimeout(() => {
      expect(window.uglyMutableLeakyVariableTest4).to.equal('none')
      setTimeout(done)
    }, 500)
  })

  it('can cancel 500 callbacks by unmounting why not', (done) => {
    const container = document.createElement('div')
    const newRendering = render(<Timed />, container)
    const b = scryRenderedDOMComponentsWithClass(newRendering, 'test5')[0]

    let i = 0
    for (i = 0; i < 500; i++) {
      Simulate.click(b)
    }

    setTimeout(() => unmountComponentAtNode(container), 10)

    setTimeout(() => {
      expect(window.uglyMutableLeakyVariableTest5).to.equal(0)
      setTimeout(done)
    }, 500)
  })

})
