import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {FractalDisplay, FractalIsShared} from "../FractalComponents";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class FractalStore extends Component {
  constructor(props, context) {
    super(props);

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    this.contracts = context.drizzle.contracts;
    this.state = {
        selected:[],
      selectedFractals:0,
      dataKey: this.contracts[this.props.contract].methods[
        'getAllzurKombinationFreigegebenExklusiveEigene'
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
  handleSelect(id){
      var selected = this.state.selected;
      if(this.state.selected.length < 2){
          if(!selected.includes(id)) {
            selected.push(id);
          }
          else{
            var index = selected.indexOf(id);
              selected.splice(index, 1);
          }
          this.setState({selected: selected});
      }
      else if(this.state.selected.length === 2 && this.state.selected.includes(id))
      {
        var index = selected.indexOf(id);
        selected.splice(index, 1);
        this.setState({selected: selected});
      }
  }
  getSelected(){
    if(!this.state.selected)return 0;
    return this.state.selected;
  }
  componentWillMount() {
      this.setState({selectedFractals:window.fractalsOfUser.getSelected().length});
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
        this.props.contracts[this.props.contract]['getAllzurKombinationFreigegebenExklusiveEigene']
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
      'getAllzurKombinationFreigegebenExklusiveEigene'
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
    if (Array.isArray(displayData)) {
      var displayFractals = displayData.map((datum, index) => {
        return (
            <Col xs={4}><div className={"fractal-overlay "+ (this.state.selected.includes(datum) ? 'fractal-overlay-selected' : '')}><ButtonToolbar >
    <Button variant="primary" size="sm" onClick={((e) => window.FractalDetailView.handleShow(e))}>
      Enlarge
    </Button>
     <Button variant="success" size="sm" onClick={(() => window.FractalStoreMergeControl.handleShow(datum))} {...(this.state.selectedFractals === 1 ? {disabled: 'disabled'} : {})}>
      Merge
    </Button>

  </ButtonToolbar></div> <FractalDisplay contract="FullContract" method="getFraktalFromId" methodArgs={[datum]} fractalId={datum}/></Col>);
      });
              while(displayFractals.length%3 !== 0){
          displayFractals.push(<Col xs={4}><div className="blocker"></div><div className="fractalContainer"></div></Col>);
        }

        return displayFractals;
    }

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