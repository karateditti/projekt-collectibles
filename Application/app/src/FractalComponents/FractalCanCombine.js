import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class FractalCanCombine extends Component {
  constructor(props, context) {
    super(props);
    window.FractalCanCombine = this;
    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: this.contracts['FullContract'].methods[
        'canCombine'
      ].cacheCall(...methodArgs),
    };
  }

  // Will not fix legacy component
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { methodArgs, contract, method } = this.props;

    const didContractChange = contract !== nextProps.contract;
    const didMethodChange = method !== nextProps.method;
    const didArgsChange =
      JSON.stringify(methodArgs) !== JSON.stringify(nextProps.methodArgs);

    if (didContractChange || didMethodChange || didArgsChange) {
      this.setState({
        dataKey: this.contracts[nextProps.contract].methods[
          'canCombine'
        ].cacheCall(...nextProps.methodArgs),
      });
    }
  }
 canCombine() {
        return this.props.contracts['FullContract'][
      'canCombine'
    ][this.state.dataKey].value;
 }

    render() {
    // Contract is not yet intialized.
    if (!this.props.contracts['FullContract'].initialized) {
      return <span>Initializing...</span>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey in
        this.props.contracts['FullContract']['canCombine']
      )
    ) {
      return <span>Fetching...</span>;
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts['FullContract'].synced
      ? ""
      : " 🔄";

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = "";
    }

    var displayData = this.props.contracts['FullContract'][
      'canCombine'
    ][this.state.dataKey].value;


    if(displayData===true){
        return <>
                              <Row className={this.props.hidden ? 'hidden': ''}>
                  <Col xs={12 }>
                <p>Your fractals shown below are about to be merged. Please confirm your transaction. You will receive a brand new fractal and also keep your old ones.</p>
              </Col>
                  </Row>
                  <Row className={this.props.hidden ? 'hidden': ''}>
                  <Col xs={6} md={6}>
                <canvas width="300" height="300" id="mergefractal_l"></canvas>
              </Col>
                  <Col xs={6} md={6}>
                <canvas width="300" height="300" id="mergefractal_r"></canvas>
              </Col>
                  </Row>
        </>;
    }
    else {
        return (
            <Row className={this.props.hidden ? 'hidden': ''}>
                  <Col xs={12 }>
                <p>Unfortunately, your selected fractals cannot be merged!</p>
              </Col>
                  </Row>
        );
    }
  }
}

FractalCanCombine.contextTypes = {
  drizzle: PropTypes.object,
};

FractalCanCombine.propTypes = {
  contracts: PropTypes.object.isRequired,
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  methodArgs: PropTypes.array,
  hideIndicator: PropTypes.bool,
  toUtf8: PropTypes.bool,
  toAscii: PropTypes.bool,
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

export default drizzleConnect(FractalCanCombine, mapStateToProps);