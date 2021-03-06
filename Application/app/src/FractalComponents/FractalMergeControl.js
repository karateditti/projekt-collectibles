import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import {FractalFirstMint, FractalMerge, FractalCanCombine} from "../FractalComponents";
import FractalStoreMerge from "./FractalStoreMerge";
class FractalMergeControl extends React.Component {
  constructor(props, context) {
    super(props, context);
     this.setState({ canCombine: undefined });
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
     this.onShow = this.onShow.bind(this);
    window.FractalMergeControl = this;
    this.state = {
      show: false,
    };
  }
      handleClose() {
    this.setState({ show: false });
    this.setState({ canCombine: undefined });

  }

  handleShow() {
    this.setState({ show: true });
  }
  onShow(){

      try{
          if(window.FractalCanCombine.canCombine() === true){var mergefractal_l = document.getElementById('mergefractal_l');
                mergefractal_l.getContext('2d').drawImage(document.getElementById('fract-' + window.fractalsOfUser.getSelected()[0]),0,0);
                var mergefractal_r = document.getElementById('mergefractal_r');
                mergefractal_r.getContext('2d').drawImage(document.getElementById('fract-' + window.fractalsOfUser.getSelected()[1]),0,0);
                 this.setState({ canCombine: true });
                 return;
          }
          this.setState({ canCombine: false });
      }
      catch (e) {
            setTimeout(this.onShow, 4000);
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
                      {this.state.canCombine == null &&
                      <Col xs={12}>
                          <p>Please wait while we verify your transaction...</p>
                      </Col>
                      }
                      <FractalCanCombine methodArgs={[ window.fractalsOfUser.getSelected()[0] ,window.fractalsOfUser.getSelected()[1]  ]  }  hidden={this.state.canCombine == null}/>
              </Col>
                  </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
              {this.state.canCombine == null &&
                 <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Validating...
                  </Button>
          //<FractalMerge contract="FullContract" method="combine"  />
      }
              {this.state.canCombine === true &&
                  <FractalMerge contract="FullContract" method="combineInternal"  />
              }
          </Modal.Footer>
        </Modal>
          <Card body className="text-center fractal-merge-control"><p>Select two fractals to merge them. <Button variant="dark" className="float-right" onClick={this.handleShow} disabled={disabled}>Merge Fractals</Button></p></Card>

          </>
          );
  }
}

export default FractalMergeControl;