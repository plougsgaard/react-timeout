# React Timeout

[![travis build](https://img.shields.io/travis/plougsgaard/react-timeout.svg)](https://travis-ci.org/plougsgaard/react-timeout) [![npm version](https://badge.fury.io/js/react-timeout.svg)](https://badge.fury.io/js/react-timeout)

> Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op.

Seeing a lot of the above? If so this might be useful!

React Timeout is a higher order component for [React](https://github.com/facebook/react) and [React Native](https://github.com/facebook/react-native) providing the wrapped component with **safe** versions of

Set                     | Clear
------------------------|------------------------
`setTimeout`            | `clearTimeout`
`setInterval`           | `clearInterval`
`setImmediate`          | `clearImmediate`
`requestAnimationFrame` | `cancelAnimationFrame`

When the wrapped component is *unmounted*, any lingering timers will be canceled automatically.

# Installation

`npm install --save react-timeout`

## React

```javascript
import ReactTimeout from 'react-timeout'
```

## React Native

From `^0.18` and onwards *it just works*.

For previous versions, import it like so:

```javascript
import ReactTimeout from 'react-timeout/native'
```

# Examples

## React "Classic" (verbose)

This simulates a light switch that takes `5000ms` to switch between `on` and `!on`.

```javascript
import ReactTimeout from 'react-timeout'

var Example = React.createClass({
  toggleOn: function () {
    this.setState({ on: !this.state.on })
  },
  handleClick: function (e) {
    this.props.setTimeout(this.toggleOn, 5000)
  },
  render: function () {
    return (
      <button
        style={{ backgroundColor: (this.state.on ? 'yellow' : 'gray') }}
        onClick={this.handleClick}>Click me!</button>
    )
  }
})

export default ReactTimeout(Example)
```

Had we just called the regular old `setTimeout` and unmounted the component, the callback would still fire and try setting the state of an unmounted component. However since we use `ReactTimeout` the `this.props.setTimeout` will get canceled the moment the component unmounts.

## ES6 Classes

```javascript
class Example extends Component {
  render() {
    return (
      <button
        onClick={() => this.props.setTimeout(..)}>Click me!</button>
    )
  }
}
export default ReactTimeout(Example)
```

## Functional Stateless Components

```javascript
const Example = ({ setTimeout }) => ({
  <button
    onClick={() => setTimeout(..)}>Click me!</button>
})
export default ReactTimeout(Example)
```

## With ES7 Annotations

```javascript
@ReactTimeout
class Example extends Component { .. }
```

```javascript
@ReactTimeout
var Example = React.createClass({ .. })
```

# Something similar

## [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/facebook/react-native) docs.

# Changes

## Changes in ^1.0.0

Since the major version changed from `0` to `1` the only breaking change is dropping the `reactTimeout` namespace.

For example: `this.props.reactTimeout.setTimeout` becomes `this.props.setTimeout`.
