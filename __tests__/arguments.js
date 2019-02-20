/* global afterEach, describe, expect, test */

import React from 'react'
import * as testUtils from 'react-testing-library'

// What to test

import reactTimeout from '..'

let __experimentArguments = 'unchanged'

class TestClass extends React.Component {
  static defaultProp = { delay: 100, experiment: 'experiment1', argument: undefined }
  experiment1 = () => {
    this.props.setTimeout((arg1) => { __experimentArguments = arg1 }, this.props.delay, this.props.argument)
  }
  experiment2 = () => {
    this.props.setTimeout((arg1, arg2, arg3) => { __experimentArguments = arg3 }, this.props.delay, undefined, undefined, this.props.argument)
  }
  render () {
    return (
      <button onClick={this[this.props.experiment]}>RunExperiment</button>
    )
  }
}
const TestClassWithTimeout = reactTimeout(TestClass)

// The tests

afterEach(testUtils.cleanup)

describe('arguments', () => {
  test('transfers 1 argument', (done) => {
    __experimentArguments = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment1' delay={0} argument={'myValue'} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    setTimeout(() => {
      expect(__experimentArguments).toBe('myValue')
      done()
    })
  })
  test('transfers 3 arguments', (done) => {
    __experimentArguments = 'unchanged'
    let t = testUtils.render(<TestClassWithTimeout experiment='experiment2' delay={0} argument={'myValue'} />)
    testUtils.fireEvent.click(t.getByText('RunExperiment'))
    setTimeout(() => {
      expect(__experimentArguments).toBe('myValue')
      done()
    })
  })
})
