import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import {FractalFirstMint, FractalMerge} from "../FractalComponents";
class FractalMergeControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
     this.onShow = this.onShow.bind(this);

    this.state = {
      show: false,
    };
  }
      handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });

  }
  onShow(){
    var mergefractal_l = document.getElementById('mergefractal_l');
    mergefractal_l.getContext('2d').drawImage(document.getElementById('fract-' + window.fractalsOfUser.getSelected()[0]),0,0);
    var mergefractal_r = document.getElementById('mergefractal_r');
    mergefractal_r.getContext('2d').drawImage(document.getElementById('fract-' + window.fractalsOfUser.getSelected()[1]),0,0);
      try{

      }
      catch (e) {
          
      }
  }
  render() {
      try {
          var fractals = parseInt(document.getElementById("meta_balanceOf").value);
      }
      catch (e) {
          return null;
      }
      if(fractals===0){
          return <Card body className="text-center fractal-merge-control"><p>You currently do not own any fractals. Hit the button to get your first fractals. <FractalFirstMint contract="FullContract" method="firstMint" /></p></Card>;
      }
      var toggled_fractals = document.getElementsByClassName('fractal-toggled');
      var disabled = true;
      if(window.fractalsOfUser.getSelected().length === 2){
          disabled = false;
      }
      return (<>
          <Modal show={this.state.show} onHide={this.handleClose} onShow={this.onShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Merge fractals</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container>
                  <Row>
                  <Col xs={12 }>
                <p>Your fractals shown below are about to be merged. Please confirm your transaction. You will receive a brand new fractal and also keep your old ones.</p>
              </Col>
                  </Row>
                  <Row>
                  <Col xs={6} md={6}>
                <canvas width="300" height="300" id="mergefractal_l"></canvas>
              </Col>
                  <Col xs={6} md={6}>
                <canvas width="300" height="300" id="mergefractal_r"></canvas>
              </Col>
                  </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
              <FractalMerge contract="FullContract" method="combine"  />
          </Modal.Footer>
        </Modal>
          <Card body className="text-center fractal-merge-control"><p>Select two fractals to merge them. <Button variant="dark" className="float-right" onClick={this.handleShow} disabled={disabled}>Merge Fractals</Button></p></Card>

          </>
          );
  }
}

export default FractalMergeControl;