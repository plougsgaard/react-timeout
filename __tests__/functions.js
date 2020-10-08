/* global afterEach, describe, expect, test */

import React from 'react'
import { render, cleanup } from 'react-testing-library'

// What to test

import reactTimeout from '..'

class TestClass extends React.Component {
  render () {
    return (<div data-testid='function-type'>{typeof this.props[this.props.queryFunction]}</div>)
  }
}
const TestClassWithTimeout = reactTimeout(TestClass)

// The tests

afterEach(cleanup)

describe('has all the functions`', () => {
  test('setTimeout', () => {
    const t = render(<TestClassWithTimeout queryFunction='setTimeout' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('clearTimeout', () => {
    const t = render(<TestClassWithTimeout queryFunction='clearTimeout' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('setInterval', () => {
    const t = render(<TestClassWithTimeout queryFunction='setInterval' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('clearInterval', () => {
    const t = render(<TestClassWithTimeout queryFunction='clearInterval' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('setImmediate', () => {
    const t = render(<TestClassWithTimeout queryFunction='setImmediate' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('clearImmediate', () => {
    const t = render(<TestClassWithTimeout queryFunction='clearImmediate' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('requestAnimationFrame', () => {
    const t = render(<TestClassWithTimeout queryFunction='requestAnimationFrame' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('cancelAnimationFrame', () => {
    const t = render(<TestClassWithTimeout queryFunction='cancelAnimationFrame' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
})
