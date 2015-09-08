# React Timeout

A component wrapper providing **safe-to-use-with-react** versions of
* setTimeout
* setInterval
* setImmediate
* requestAnimationFrame

and their inverse counterparts.

**React Timeout** takes care of clearing the timeout when the [React]() component is unmounted.

## Installation

`npm install --save react-timeout`

## Usage

```javascript
import ReactTimeout from 'react-timeout'

@ReactTimeout
class A extends Component {
  constructor (props) {
    super(props)
    this.startTimer = this.startTimer.bind(this)
  }
  startTimer () {
    const { setTimeout } = this.props.reactTimeout
    const id = setTimeout(() => { console.log(`${id} - end`) }, 5000)
    console.log(`${id} - begin`)
  }
  render () {
    return (..)
  }
}
```

A full example is available in `example/src/example.js`.

To run the example go to `example/` and enter `npm install && npm start` (assumes *python* is installed).

## Inspiration

### [react-timer-mixin](https://github.com/reactjs/react-timer-mixin)

The timer mixin recommended by the  [react-native](https://github.com/reactjs/react-native) `README.md`.

### [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

[Dan Abramov](https://github.com/gaearon)'s musing on why a project like this might be a good idea.
