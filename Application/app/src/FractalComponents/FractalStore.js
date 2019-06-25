import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {FractalDisplay} from "../FractalComponents";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

class FractalStore extends Component {
  constructor(props, context) {
    super(props);

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: this.contracts[this.props.contract].methods[
        'getAllZumVerkauf'
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
          nextProps.method
        ].cacheCall(...nextProps.methodArgs),
      });
    }
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts[this.props.contract].initialized) {
      return <span>Initializing...</span>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey in
        this.props.contracts[this.props.contract]['getAllZumVerkauf']
      )
    ) {
      return <span>Fetching...</span>;
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts[this.props.contract].synced
      ? ""
      : " 🔄";

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = "";
    }

    var displayData = this.props.contracts[this.props.contract][
      'getAllZumVerkauf'
    ][this.state.dataKey].value;

    // Optionally convert to UTF8
    if (this.props.toUtf8) {
      displayData = this.context.drizzle.web3.utils.hexToUtf8(displayData);
    }

    // Optionally convert to Ascii
    if (this.props.toAscii) {
      displayData = this.context.drizzle.web3.utils.hexToAscii(displayData);
    }

    // If a render prop is given, have displayData rendered from that component
    if (this.props.render) {
      return this.props.render(displayData);
    }

    // If return value is an array
    if (Array.isArray(displayData)) {

      var fractalsArray =[];
      const displayListItems = displayData.map((datum, index) => {
        return (
          fractalsArray.push(<Col xs={4}><FractalDisplay contract="FullContract" method="getFraktalFromId" methodArgs={datum}/></Col>)
        );
      });
        while(fractalsArray.length%3 !== 0){
          fractalsArray.push(<Col xs={4}><div className="blocker"></div><div className="fractalContainer"></div></Col>);
        }
        return (
        <Container id="storeFractalsContainer">
    <Row className="fractalDisplay">
        {fractalsArray}
    </Row>
        </Container>
    );
    }

    // If retun value is an object
    if (typeof displayData === "object") {
      var i = 0;
      const displayObjectProps = [];

      Object.keys(displayData).forEach(key => {
        if (i != key) {
          displayObjectProps.push(
            <li key={i}>
              <strong>{key}</strong>
              {pendingSpinner}
              <br />
              {`${displayData[key]}`}
            </li>,
          );
        }

        i++;
      });

      return <ul>{displayObjectProps}</ul>;
    }

    return (
        <Container id="storeFractalsContainer">
    <Row className="fractalDisplay">
        {displayData}
    </Row>
        </Container>
    );
  }
}

FractalStore.contextTypes = {
  drizzle: PropTypes.object,
};

FractalStore.propTypes = {
  contracts: PropTypes.object.isRequired,
  contract: PropTypes.string.isRequired,
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

export default drizzleConnect(FractalStore, mapStateToProps);