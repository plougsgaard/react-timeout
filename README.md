# React Timeout

[![travis build](https://img.shields.io/travis/plougsgaard/react-timeout.svg)](https://travis-ci.org/plougsgaard/react-timeout) [![npm version](https://badge.fury.io/js/react-timeout.svg)](https://badge.fury.io/js/react-timeout)

A component wrapper providing **safe-to-use-with-react** versions of

Set                     | Clear
------------------------|------------------------
`setTimeout`            | `clearTimeout`
`setInterval`           | `clearInterval`
`setImmediate`          | `clearImmediate`
`requestAnimationFrame` | `cancelAnimationFrame`

When the component is *unmounted* the wrapper calls the **Clear** functions for you.

## Installation

`npm install --save react-timeout`

## Usage

Import and apply **ReactTimeout** either with an annotation

```javascript
import ReactTimeout from 'react-timeout'

@ReactTimeout
class Timeoutable extends Component { .. }
```

or with composition

```javascript
class Simple extends Component { .. }
const Timeoutable = ReactTimeout(Simple)
```

Invoke a `setTimeout`.

```javascript
const { setTimeout } = this.props.reactTimeout
const id = setTimeout(() => {
  console.log(`The callback with ${id} ended up happening!`)
}, 5000)
```

If the component unmounts before time elapses the callback is cleared and will never run.

## Example

A full example is available in `example/src/example.js`.

To run the example go to `example/` and enter `npm install && npm start` (assumes *python* is installed).

## Inspiration

### [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/reactjs/react-native) `README.md`.

### [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

[Dan Abramov](https://github.com/gaearon)'s musing on why a project like this might be a good idea.
