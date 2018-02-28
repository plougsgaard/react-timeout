import React, { Component } from "react";
import ReactTimeout from "..";
import { expect } from 'chai'
import { renderIntoDocument } from "react-dom/test-utils";

describe("hoistNonReactStatics", () => {
  class Plain extends Component {
    static myStatic = () => 42
    render() { return <div />; }
  }

  const Timed = ReactTimeout(Plain);
  const rendering = renderIntoDocument(<Timed />);

  it('can see static properties', () => {
    expect(typeof Timed.myStatic).to.equal('function')
  });

  it('can execute static functions', () => {
    expect(Timed.myStatic()).to.equal(42)
  });

});
