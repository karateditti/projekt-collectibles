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
import {FractalBalance,FractalDisplay, FractalMergeControl, FractalStore, FractalDetailView, FractalsOfUser} from "./FractalComponents.js";
import ReactDOM from 'react-dom'
import logo from "./logo.png";
import fr1 from "./fr1.PNG";
import fr2 from "./fr2.PNG";

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

{/*class MyFractals extends React.Component {
 constructor(props) {
    super(props);

  }
  render() {
var fractalsArray = [];
try{
	var fractals = parseInt(document.getElementById("meta_balanceOf").value);
}catch{ return "Loading";}
        for (var i = 0; i < fractals; i++) {
            fractalsArray.push(<Col xs={4}><div className="fractal-overlay"><ButtonToolbar>
    <Button variant="primary" size="sm" onClick={((e) => window.FractalDetailView.handleShow(e))}>
      Enlarge
    </Button>
    <Button variant="secondary" size="sm">
      Share
    </Button>
  </ButtonToolbar></div> <FractalDisplay contract={contract} method="getFraktalFromId" methodArgs={[i]}/></Col>);
        }
        while(fractalsArray.length%3 !== 0){
          fractalsArray.push(<Col xs={4}><div className="blocker"></div><div className="fractalContainer"></div></Col>);
        }
        return          fractalsArray;
}

 componentDidMount() {
   console.log("did mount");
   setTimeout(eval, 1000, 'initialize_fractals();');
   return;
   function initFractal(id) {
     console.log("will \"fract.init('\"+id+\"');\"");
  eval("fract.init('"+id+"');");
}
  var fractals = document.getElementsByClassName('render-fractal');
   console.log(fractals);
  for (var i = 0; i < fractals.length; i++) {
  console.log(fractals[i].id);
    setTimeout(initFractal, 1, fractals[i].id);
    //Do something
}
  }
}
*/}


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

</Container>

    </Container>
  <Container fluid={true} id="bg-2">
      <Container>
              <h2 id="fractalStore">
        Fractal Store
    </h2>
          {/*<FractalStore contract={contract}/>*/}
    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex="0" units="ether" precision="3" />
      <p>
        <strong>Symbol: </strong>
        <ContractData
            contract={contract}
            method="symbol"
        />
<ContractForm contract={contract} method="mint" />
      </p>
      <p>
        <strong>Tokeninhalt: </strong>
          {/*<ContractData
          contract={contract}
          method="getFraktalFromId"
          methodArgs={[1]}
        />*/}
      </p>
    </div>
      </Container>
  </Container>
        <Container fluid={true} id="bg-3">
      <Container>
              <h2 id="guide">
        How it works:
    </h2>
      </Container>
  </Container>
              <Container fluid={true} id="bg-4">
      <Container>
          <Row>
              <h2>
        Fractals on Blockchain
    </h2>
          </Row>
      </Container>
  </Container>
  </div>
);
