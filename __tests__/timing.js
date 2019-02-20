/* global afterEach, describe, expect, test */

import 'babel-polyfill' // used for experiment1 only
import React from 'react'
import 'jest-dom/extend-expect' // used for experiment1 only
import * as testUtils from 'react-testing-library'

// What to test

import reactTimeout from '..'

let __experimentSetTimeout = 'unchanged'
let __experimentClearTimeout = 'unchanged'

class TestClass extends React.Component {
  static defaultProp = { delay: 100, experiment: 'experiment1' }
  state = { result: '' }
  experiment1 = () => {
    this.props.setTimeout(() => {
      this.setState({ result: 'completed' })
    }, this.props.delay)
  }
  experiment2 = () => {
    this.props.setTimeout(() => { __experimentSetTimeout = 'changed' }, this.props.delay)
  }
  experiment3 = () => {
    const id = this.props.setTimeout(() => { __experimentClearTimeout = 'changed' }, this.props.delay)
    this.props.clearTimeout(id)
  }
  render () {
    return (
      <div>
        <button onClick={this[this.props.experiment]}>RunExperiment</button>
        {(this.state.result === 'completed') && (<div>completed</div>)}
      </div>
    )
  }
}
const TestClassWithTimeout = reactTimeout(TestClass)

// The tests

afterEach(testUtils.cleanup)

describe('timing', () => {
  test('fires immediately', async () => {
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment1' delay={0} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))

    // by the power of some voodoo magic this wait until a node with 'completed' appears
    // this isn't really a good way to test this, but I've retained anyhow
    const node = await testUtils.waitForElement(() => t.getByText('completed'))
    expect(node).toBeInTheDocument() // from jest-dom/extend-expect
  })
  test('remains unchanged when checked immediately', () => {
    __experimentSetTimeout = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment2' delay={0} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    expect(__experimentSetTimeout).toBe('unchanged')
  })
  test('is changed if checked after a tick', (done) => {
    __experimentSetTimeout = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment2' delay={0} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    setTimeout(() => {
      expect(__experimentSetTimeout).toBe('changed')
      done()
    })
  })
  test('is unchanged when cleared immediately', (done) => {
    __experimentClearTimeout = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment3' delay={0} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    setTimeout(() => {
      expect(__experimentClearTimeout).toBe('unchanged')
      done()
    })
  })
  test('it is unmounted before it can fire', (done) => {
    __experimentSetTimeout = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment2' delay={50} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    setTimeout(() => {
      t.unmount()
    }, 25)
    setTimeout(() => {
      expect(__experimentSetTimeout).toBe('unchanged')
      done()
    }, 75)
  })
  test('can cancel 100 callbacks by unmounting why not', (done) => {
    __experimentSetTimeout = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment2' delay={250} />)
    let button = t.getByText('RunExperiment')
    let i = 0
    for (i = 0; i < 100; i++) {
      testUtils.fireEvent.click(button)
    }
    setTimeout(() => {
      t.unmount()
    }, 100)
    setTimeout(() => {
      expect(__experimentSetTimeout).toBe('unchanged')
      done()
    }, 500)
  })
})
