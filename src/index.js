var React = require('react')

var objectAssign = require('object-assign')
var hoistNonReactStatics = require('hoist-non-react-statics')

var GLOBAL = typeof window === 'undefined' ? global : window

var setter = function (_setter, _clearer, arrayKey, timerState) {
  return function (callback, delta) {
    var optionalArguments = Array.prototype.slice.call(arguments, 2)
    var id = _setter(function () {
      if (_clearer) {
        _clearer.call(this, id)
      }
      if (typeof callback === 'function') {
        callback.apply(this, optionalArguments)
      }
    }.bind(this), delta)

    if (!timerState[arrayKey]) {
      timerState[arrayKey] = [id]
    } else {
      timerState[arrayKey].push(id)
    }
    return id
  }
}

var clearer = function (_clearer, array, timerState) {
  return function (id) {
    if (timerState[array]) {
      var index = timerState[array].indexOf(id)
      if (index !== -1) {
        timerState[array].splice(index, 1)
      }
    }
    _clearer(id)
  }
}

var cloneArray = function (a) {
  return (!a || typeof a.slice !== 'function') ? [] : a.slice(0)
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

var _timeouts = '_ReactTimeout_timeouts'
var _intervals = '_ReactTimeout_intervals'
var _immediates = '_ReactTimeout_immediates'
var _rafs = '_ReactTimeout_rafs'

function withReactTimeout (WrappedComponent) {
  var ReactTimeout = hoistNonReactStatics(React.forwardRef(function (props, ref) {
    var timerState = {}

    var clearTimeout = React.useCallback(clearer(GLOBAL.clearTimeout, _timeouts, timerState), [])
    var setTimeout = React.useCallback(setter(GLOBAL.setTimeout, clearTimeout, _timeouts, timerState), [])

    var clearInterval = React.useCallback(clearer(GLOBAL.clearInterval, _intervals, timerState), [])
    var setInterval = React.useCallback(setter(GLOBAL.setInterval, null, _intervals, timerState), [])

    var clearImmediate = React.useCallback(clearer(GLOBAL.clearImmediate, _immediates, timerState), [])
    var setImmediate = React.useCallback(setter(GLOBAL.setImmediate, clearImmediate, _immediates, timerState), [])

    var cancelAnimationFrame = React.useCallback(clearer(GLOBAL.cancelAnimationFrame, _rafs, timerState), [])
    var requestAnimationFrame = React.useCallback(setter(GLOBAL.requestAnimationFrame, cancelAnimationFrame, _rafs, timerState), [])

    React.useEffect(function () {
      return function cleanUp () {
        cloneArray(timerState[_timeouts]).forEach(clearTimeout)
        cloneArray(timerState[_intervals]).forEach(clearInterval)
        cloneArray(timerState[_immediates]).forEach(clearImmediate)
        cloneArray(timerState[_rafs]).forEach(cancelAnimationFrame)
      }
    }, [])
    var newProps = objectAssign(
      {},
      props,
      {
        ref: ref,

        setTimeout: setTimeout,
        clearTimeout: clearTimeout,

        setInterval: setInterval,
        clearInterval: clearInterval,

        setImmediate: setImmediate,
        clearImmediate: clearImmediate,

        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame
      }
    )
    return React.createElement(WrappedComponent, newProps)
  }), WrappedComponent)
  ReactTimeout.displayName = 'ReactTimeout(' + getDisplayName(WrappedComponent) + ')'
  return ReactTimeout
}

module.exports = withReactTimeout
