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

Import and apply **ReactTimeout** using composition

```javascript
import ReactTimeout from 'react-timeout'

class Simple extends Component { .. }
const Timeoutable = ReactTimeout(Simple)
```

or an annotation (not recommended)

```javascript
import ReactTimeout from 'react-timeout'

@ReactTimeout
class Timeoutable extends Component { .. }
```

Invoke a safe `setTimeout` from within the component.

```javascript
const { setTimeout } = this.props.reactTimeout
const id = setTimeout(() => {
  console.log(`The callback with ${id} fired!`)
}, 5000)
```

The callback function will be cleared if the component unmounts before time elapses.

## Example

A full example is available in `example/src/example.js`.

To run the example, clone the repository and run `npm install && npm start` in the `example/` folder.

## Inspiration

### [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/reactjs/react-native) `README.md`.

### [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

[Dan Abramov](https://github.com/gaearon)'s musing on why a project like this might be a good idea.
