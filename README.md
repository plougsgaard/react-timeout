# React Timeout

A component wrapper providing **safe-to-use-with-react** versions of
* `setTimeout` & `clearTimeout`
* `setInterval` & `clearInterval`
* `setImmediate` & `clearImmediate`
* `requestAnimationFrame` & `cancelAnimationFrame`

When the component is unmounted the wrapper calls the *clear* functions for you.

## Installation

`npm install --save react-timeout`

## Usage

Import and apply **ReactTimeout** either with an annotation or with composition.

```javascript
import ReactTimeout from 'react-timeout'

@ReactTimeout
class Timeoutable extends Component { .. }

class Simple extends Component { .. }
const Timeoutable = ReactTimeout(Simple)
```

Invoke a `setTimeout`. The callback will be cleared if `Timeoutable` unmounts first.

```javascript
const { setTimeout } = this.props.reactTimeout
const id = setTimeout(() => {
  console.log(`The callback with ${id} ended up happening!`)
}, 5000)
```

## Example

A full example is available in `example/src/example.js`.

To run the example go to `example/` and enter `npm install && npm start` (assumes *python* is installed).

## Inspiration

### [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/reactjs/react-native) `README.md`.

### [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

[Dan Abramov](https://github.com/gaearon)'s musing on why a project like this might be a good idea.
