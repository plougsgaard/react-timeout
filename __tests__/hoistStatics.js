/* global afterEach, describe, expect, test */

import React from 'react'
import { cleanup } from 'react-testing-library'

// What to test

import reactTimeout from '..'

class TestClass extends React.Component {
  static myStatic = () => 42
  render () {
    return (<div />)
  }
}
const TestClassWithTimeout = reactTimeout(TestClass)

// The tests

afterEach(cleanup)

describe('hoistNonReactStatics`', () => {
  test('can see static properties', () => {
    expect(typeof TestClassWithTimeout.myStatic).toBe('function')
  })
  test('can execute static functions', () => {
    expect(TestClassWithTimeout.myStatic()).toBe(42)
  })
})
