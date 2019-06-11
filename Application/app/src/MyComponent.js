import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Particles from 'react-particles-js';
import logo from "./logo.png";
import fr1 from "./fr1.PNG";
import fr2 from "./fr2.PNG";
class MyFractals extends React.Component {
 constructor(props) {
    super(props);

  }
  render() {
var fractalsArray = [];
try{
	var fractals = parseInt(document.getElementById("fractalCount").getElementsByTagName("span")[1].innerHTML);
}catch{}
        for (var i = 0; i < fractals; i++) {
            fractalsArray.push(<Col xs={3}><div className="blocker"></div><div className="fractalContainer"><ContractData contract="Eigentumsdefinition" method="getFraktalFromId" methodArgs={[i]}/><img src={fr1}/></div></Col>);
        }

        return          fractalsArray;
}
}



export default ({ accounts}) => (

  <div className="App"><Navbar collapseOnSelect expand="lg">
  <div id="logo">
	 <img src="https://mobirise.com/extensions/industrym4/assets/images/logo.png" alt="logo" id="logo" />
 </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Meine Fraktale</Nav.Link>
      <Nav.Link href="#pricing">Store</Nav.Link>
      <NavDropdown title="Anleitung" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link eventKey={2} href="#">
       <Image src="https://image.flaticon.com/icons/png/512/55/55089.png" roundedCircle id="profileLink" />
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>    <Container fluid={true} id="headContainers">
 </Container>
    <Jumbotron fluid>
<Particles params={
{
  "particles": {
    "number": {
      "value": 227,
      "density": {
        "enable": true,
        "value_area": 2051.7838682439087
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
canvas: {
      w: 1000,
      h: 200
    },
  "retina_detect": false
}


} />
  <Container>
    <h1>Fractals on Blockchain</h1>
    <p>
      Start collecting your unique, personal fracts on the Ethereum blockchain today!
    </p>
  </Container>
</Jumbotron>    
<Container className="mainContainer">
<h2 id="fractalCount">
    Meine Fraktale <Badge variant="secondary" ><ContractData
          contract="Eigentumsdefinition"
          method="balanceOf"
          methodArgs={[accounts[0]]}
        />
</Badge>
  </h2>
<Row className="fractalDisplay">
<MyFractals account={[accounts[0]]} fractals=<ContractData
          contract="Eigentumsdefinition"
          method="balanceOf"
          methodArgs={[accounts[0]]}
        />
 />



</Row>
    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex="0" units="ether" precision="3" />
      <p>
        <strong>Symbol: </strong>
        <ContractData
            contract="Eigentumsdefinition"
            method="symbol"
        />
<ContractForm contract="Eigentumsdefinition" method="mint" />
      </p>
      <p>
        <strong>Tokeninhalt: </strong>
        <ContractData
          contract="Eigentumsdefinition"
          method="getFraktalFromId"
          methodArgs={[1]}
        />
      </p>
    </div>

    <div className="section">
      <h2>SimpleStorage</h2>
      <p>
        This shows a simple ContractData component with no arguments, along with
        a form to set its value.
      </p>
      <p>
        <strong>Stored Value: </strong>
        <ContractData contract="SimpleStorage" method="storedData" />
      </p>
      <ContractForm contract="SimpleStorage" method="set" />
    </div>

    <div className="section">
      <h2>TutorialToken</h2>
      <p>
        Here we have a form with custom, friendly labels. Also note the token
        symbol will not display a loading indicator. We've suppressed it with
        the <code>hideIndicator</code> prop because we know this variable is
        constant.
      </p>
      <p>
        <strong>Total Supply: </strong>
        <ContractData
          contract="TutorialToken"
          method="totalSupply"
          methodArgs={[{ from: accounts[0] }]}
        />{" "}
        <ContractData contract="TutorialToken" method="symbol" hideIndicator />
      </p>
      <p>
        <strong>My Balance: </strong>
        <ContractData
          contract="TutorialToken"
          method="balanceOf"
          methodArgs={[accounts[0]]}
        />
      </p>
      <h3>Send Tokens</h3>
      <ContractForm
        contract="TutorialToken"
        method="transfer"
        labels={["To Address", "Amount to Send"]}
      />
    </div>
    <div className="section">
      <h2>ComplexStorage</h2>
      <p>
        Finally this contract shows data types with additional considerations.
        Note in the code the strings below are converted from bytes to UTF-8
        strings and the device data struct is iterated as a list.
      </p>
      <p>
        <strong>String 1: </strong>
        <ContractData contract="ComplexStorage" method="string1" toUtf8 />
      </p>
      <p>
        <strong>String 2: </strong>
        <ContractData contract="ComplexStorage" method="string2" toUtf8 />
      </p>
      <strong>Single Device Data: </strong>
      <ContractData contract="ComplexStorage" method="singleDD" />
    </div>
    </Container>
  </div>
);
