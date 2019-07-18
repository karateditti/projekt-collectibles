import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from "prop-types";

class FractalDisplay extends Component {
  constructor(props, context) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleRarity = this.handleRarity.bind(this);
    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];

    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: this.contracts[this.props.contract].methods[
        this.props.method
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
   componentDidMount() {
      this.handleRarity();
   }
   handleRarity(){
      try {
        console.log("props is : "+this.props.fractalId);
        var fract_container = document.getElementById("fract-"+this.props.fractalId).parentElement;
        console.log(fract_container);
        switch (parseInt(document.getElementById("fract-"+this.props.fractalId).dataset.rarity)) {
          case 2:
            fract_container.style.boxShadow = "inset 1px 1px 10px 0 rgba(245, 66, 111, 0.9)";
            break;

            case 1:
            fract_container.style.boxShadow = "inset 1px 1px 10px 0 rgba(72, 245, 66, 0.9)";
            break;

            case 3:
            fract_container.style.boxShadow = "inset 1px 1px 10px 0 rgba(66, 135, 245, 0.9)";
            break;

            default:
            //fract_container.style.boxShadow = "inset 1px 1px 10px 0 rgba(0, 10, 20, 0.9)";
            break;
        }
      }
      catch (e) {
      console.log("handle rarity: "+e);
      setTimeout(this.handleRarity, 1000);
      }
   }
 handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
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
        this.props.contracts[this.props.contract][this.props.method]
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
      this.props.method
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
    var rgbToHex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
    };
    // If return value is an
    /*
    if (Array.isArray(displayData)) {
      const displayListItems = displayData.map((datum, index) => {
        return (
          <li key={index}>
            {`${datum}`} array
            {pendingSpinner}
          </li>
        );
      });
  */
      return <canvas id={"fract-"+this.props.fractalId} className= {'render-fractal '+(this.state.isToggleOn ? 'fractal-toggled' : '')} width="300" height="300" data-id={this.props.fractalId}
                     data-angle={displayData[0]} data-arms={displayData[10]} data-poly={displayData[1]} data-segments={displayData[2]} data-mirror={displayData[3]} data-depth={displayData[4]} data-rarity={displayData[5]} data-skew={displayData[9]} data-color={rgbToHex(displayData[6])+rgbToHex(displayData[7])+rgbToHex(displayData[8])} />;

    var frame = "fractal-default";
    //if(displayData.includes("115")){
     //   frame = "fractal-rare";
    //}
    //if(displayData.includes("2343")){
    //    frame = "fractal-special";
    //}
    // If retun value is an object

    return (
      <div className={"fractalContainer "+frame}>
        {`${displayData}`}
        {pendingSpinner}
      </div>
    );
  }
}

FractalDisplay.contextTypes = {
  drizzle: PropTypes.object,
};

FractalDisplay.propTypes = {
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

export default drizzleConnect(FractalDisplay, mapStateToProps);