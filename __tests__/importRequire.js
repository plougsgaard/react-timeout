/* global afterEach, describe, expect, test */

import React from 'react'
import { render, cleanup } from 'react-testing-library'

// What to test

import reactTimeoutWithImport from '..'
const reactTimeoutWithRequire = require('..')

class TestClass extends React.Component {
  render () {
    return (<div data-testid='function-type'>{typeof this.props[this.props.queryFunction]}</div>)
  }
}
const TestClassWithImport = reactTimeoutWithImport(TestClass)
const TestClassWithRequire = reactTimeoutWithRequire(TestClass)

// The tests

afterEach(cleanup)

describe('can be used with `import` and `require`', () => {
  test('using `import`', () => {
    const t = render(<TestClassWithImport queryFunction='setTimeout' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
  test('using `require`', () => {
    const t = render(<TestClassWithRequire queryFunction='setTimeout' />)
    expect(t.getByTestId('function-type').textContent).toBe('function')
  })
})
