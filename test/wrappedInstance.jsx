import React, { Component } from "react";
import ReactTimeout from "..";
import { renderIntoDocument } from "react-dom/test-utils";

describe("wrapped instance", () => {
  class Plain extends Component {
    instanceMethod() {}
    render() { return <div />; }
  }
  const Timed = ReactTimeout(Plain);
  const rendering = renderIntoDocument(<Timed />);

  it('can access the wrapped instance', () => {
    rendering.getWrappedInstance().instanceMethod();
  });

});
