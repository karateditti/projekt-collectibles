import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return "number";
    case /^string/.test(type) || /^bytes/.test(type):
      return "text";
    case /^bool/.test(type):
      return "checkbox";
    default:
      return "text";
  }
};

class FractalShare extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;
    this.utils = context.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = "";
        }

        break;
      }
    }

    this.state = initialState;
  }

  handleSubmit(event) {
    event.preventDefault();
    window.FractalShareControl.handleClose();
    const convertedInputs = this.inputs.map(input => {
      if (input.type === "bytes32") {
        return this.utils.toHex(this.state[input.name]);
      }
      return this.state[input.name];
    });

    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheSend(...convertedInputs, this.props.sendArgs);
    }

    return this.contracts[this.props.contract].methods[
      this.props.method
    ].cacheSend(...convertedInputs);
  }

  handleInputChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState({ [event.target.name]: value });
  }
  setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }
  componentDidMount() {
    var shareFractalInput = document.getElementById("shareFractal");
      this.setNativeValue(shareFractalInput, window.FractalShareControl.getSelectedElement().dataset.id);
      shareFractalInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  render() {
    if (this.props.render) {
      return this.props.render({
        inputs: this.inputs,
        inputTypes: this.inputs.map(input => translateType(input.type)),
        state: this.state,
        handleInputChange: this.handleInputChange,
        handleSubmit: this.handleSubmit,
      });
    }

    return (
      <form
        className="pure-form pure-form-stacked"
        onSubmit={this.handleSubmit}
      >
        {this.inputs.map((input, index) => {
          var inputType = translateType(input.type);
          var inputLabel = this.props.labels
            ? this.props.labels[index]
            : input.name;
          // check if input type is struct and if so loop out struct fields as well
          return (
            <input
              key={input.name}
              id={'shareFractal'}
              type={'number'}
              name={input.name}
              className={'hidden'}
              //value={window.fractalsOfUser.getSelected()[index]}
              placeholder={inputLabel}
              onChange={this.handleInputChange}
            />
          );
        })}
        <button className="btn btn-primary" onClick={this.handleSubmit} key="submit"
          type="button">
              {this.props.buttonText}
            </button>
      </form>
    );
  }
}

FractalShare.contextTypes = {
  drizzle: PropTypes.object,
};

FractalShare.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func,
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
  };
};

export default drizzleConnect(FractalShare, mapStateToProps);