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

## Usage

Apply **ReactTimeout** using composition

```javascript
class Example extends Component { .. }
const WithReactTimeout = ReactTimeout(Example)
```

or an annotation (not recommended)

```javascript
@ReactTimeout
class WithReactTimeout extends Component { .. }
```

Invoke a safe `setTimeout` from within the component.

```javascript
const { setTimeout } = this.props.reactTimeout
const id = setTimeout(() => {
  console.log(`The callback with ${id} fired!`)
}, 5000)
```

The callback function will be cleared if the component unmounts before the `5000ms` elapse.

## Example

A full example is available in `example/src/example.js`.

To run the example, clone the repository and run `npm install && npm start` in the `example/` folder.

## Similar

### [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/facebook/react-native) `README.md`.
