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

describe('wrappedInstance`', () => {
  test('can access the wrapped instance', () => {
    let t = ReactTestUtils.renderIntoDocument(<TestClassWithTimeout />)
    expect(t.getWrappedInstance().myLittleFunction()).toBe(42)
  })
})
