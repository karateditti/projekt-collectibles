import {FractalDisplay} from "../FractalComponents";
import React from "react";
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import { drizzleConnect } from "drizzle-react";
import PropTypes from "prop-types";
import {FractalIsShared} from "../FractalComponents";

class FractalsOfUser extends React.Component {
  constructor(props, context) {
    super(props);

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    window.fractalsOfUser = this;
    this.contracts = context.drizzle.contracts;
    this.state = {
        selected:[],
      dataKey: this.contracts["FullContract"].methods[
        "getFraktaleFromUser"
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
  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts["FullContract"].initialized) {
      return <span>Initializing...</span>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey in
        this.props.contracts["FullContract"]["getFraktaleFromUser"]
      )
    ) {
      return <span>Fetching...</span>;
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts["FullContract"].synced
      ? ""
      : " 🔄";

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = "";
    }

    var displayData = this.props.contracts["FullContract"]["getFraktaleFromUser"][this.state.dataKey].value;

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
      var displayFractals = displayData.map((datum, index) => {
        return (
            <Col xs={4}><div className={"fractal-overlay "+ (this.state.selected.includes(datum) ? 'fractal-overlay-selected' : '')}><ButtonToolbar >
    <Button variant="primary" size="sm" onClick={((e) => window.FractalDetailView.handleShow(e))}>
      Enlarge
    </Button>
     <Button variant={(this.state.selected.includes(datum) ? 'success' : 'secondary')} size="sm" onClick={(() => this.handleSelect(datum))} disabled={(this.state.selected.length === 2 && !this.state.selected.includes(datum) ? 'disabled' : '')}>
      {(this.state.selected.includes(datum) ? 'Deselect' : 'Select')}
    </Button>
    <FractalIsShared contract="FullContract" method="getZumKombinieren" methodArgs={[datum]} />

  </ButtonToolbar></div> <FractalDisplay contract="FullContract" method="getFraktalFromId" methodArgs={[datum]} fractalId={datum}/></Col>);
      });
              while(displayFractals.length%3 !== 0){
          displayFractals.push(<Col xs={4}><div className="blocker"></div><div className="fractalContainer"></div></Col>);
        }

        return displayFractals;
    }

  }
   componentDidUpdate() {
       setTimeout(eval, 1000, 'initialize_fractals();');
       return;
   }
}

FractalsOfUser.contextTypes = {
  drizzle: PropTypes.object,
};

FractalsOfUser.propTypes = {
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

export default drizzleConnect(FractalsOfUser, mapStateToProps);