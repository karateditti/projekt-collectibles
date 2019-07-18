import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Particles from 'react-particles-js';
import {FractalBalance,FractalDisplay, FractalMergeControl, FractalStore, FractalDetailView, FractalsOfUser, FractalShareControl, FractalFirstMint, FractalStoreMergeControl} from "./FractalComponents.js";

var contract = "FullContract"; // The primary contract to use


class ShowBalance extends React.Component {
 constructor(props) {
    super(props);
  }
  render() {
   try {
     var balance = parseInt(document.getElementById("meta_balanceOf").value);
   }
   catch (e) {
     return "";
   }
        return    balance;
}
}


export default ({ accounts}) => (

  <div className="App">
    <form id="metadata">
      <FractalBalance     contract={contract} methodArgs={[accounts[0]]}/>
  </form><Navbar collapseOnSelect expand="lg">
  <div id="logo">
	 <img src="https://mobirise.com/extensions/industrym4/assets/images/logo.png" alt="logo" id="logo" />
 </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">My Fractals</Nav.Link>
      <Nav.Link href="#pricing">Fractal Store</Nav.Link>
        <Nav.Link href="#pricing">Getting started</Nav.Link>
    </Nav>
    <Nav>
        <Navbar.Text>
      Signed in as: <a href="#login"><AccountData accountIndex="0" units="ether" precision="3" /></a>
    </Navbar.Text>
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
<Container fluid={true} id="bg-1">
    <FractalDetailView/>
    <Container className="text-center">
    <h2 id="fractalCount">
    My Fractals <Badge variant="secondary" >
        <ShowBalance/>
</Badge>

  </h2>
    </Container>
      <Container className="mainContainer">

  <Container>
    <Row className="fractalDisplay">
<FractalsOfUser methodArgs={[accounts[0]]}/>

</Row>

  </Container>
          <FractalMergeControl />
          <FractalShareControl />
          <FractalStoreMergeControl />

</Container>

    </Container>
  <Container fluid={true} id="bg-2">
      <Container>
              <h2 id="fractalStore" className="text-center">
        Fractal Store
    </h2>
          <Row className="fractalDisplay fractalStore">
          <FractalStore contract={contract}/>
          </Row>
      </Container>
  </Container>
        <Container fluid={true} id="bg-3">
      <Container>
              <h2 id="guide">
        How it works:
    </h2>
          <Row className="hiw-ol">
              <Col xs={4}><span>1</span></Col>
              <Col xs={8}><p><strong>Getting started</strong> - sign in with MetaMask and receive your first three personal fractals, free of charge.</p></Col>
          </Row>
          <Row className="hiw-ol">
              <Col xs={4}><span>2</span></Col>
              <Col xs={8}><p><strong>Merging fractals</strong> - two fractals can merge to create a new fractal. The same fractals can only be merged once. Merge your own two fractals or merge using a shared fractal by someone else. </p></Col>
          </Row>
          <Row className="hiw-ol">
              <Col xs={4}><span>3</span></Col>
              <Col xs={8}><p><strong>Start sharing</strong> - share your fractal in the fractal store, so others can use it for merging.</p></Col>
          </Row>
      </Container>
  </Container>
              <Container fluid={true} id="bg-4">
      <Container>
          <Row>
              <p id="footer">Fractals on Blockchain - Project 2019</p>
          </Row>
      </Container>
  </Container>
  </div>
);
