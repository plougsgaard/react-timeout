/* global describe, expect, test */

import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

// What to test

import reactTimeout from '..'

class TestClass extends React.Component {
  myLittleFunction () { return 42 }
  render () {
    return (<div />)
  }
}
const TestClassWithTimeout = reactTimeout(TestClass)

// The tests

describe('refs`', () => {
  test('can access the refs', () => {
    const ref = React.createRef()
    ReactTestUtils.renderIntoDocument(<TestClassWithTimeout ref={ref} />)
    expect(ref.current.myLittleFunction()).toBe(42)
  })
})
