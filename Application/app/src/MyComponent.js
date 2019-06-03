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
import logo from "./logo.png";

export default ({ accounts }) => (
  <div className="App">
    <Container fluid={true} id="headContainer">
  <Row>
    <Col md={6}>
      <img src={logo} alt="logo" id="logo" />
    </Col>
    <Col md={6}>
      <Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Meine Fraktale</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Store</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Anleitung</Nav.Link>
    </Nav.Item>
  </Nav>
    </Col>
  </Row>
</Container>
    <Container fluid={true} id="separator">
    </Container>
    <Container>
      <h1>Fraktale on Blockchain</h1>
      <p>Projekt</p>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex="0" units="ether" precision="3" />
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
