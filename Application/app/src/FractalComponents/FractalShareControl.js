import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {FractalMerge, FractalShare} from "../FractalComponents";

class FractalShareControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onShow = this.onShow.bind(this);
    window.FractalShareControl = this;
    this.state = {
      show: false,
        fractal_el:0
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(e, isShared) {
    this.setState({ fractal_el:e.target.parentElement.parentElement.parentElement.lastElementChild, show: true , isShared:isShared});
 console.log("handleshow : " +e.target.parentElement.parentElement.parentElement.lastElementChild.id);

  }
 componentDidMount() {

        //var el =  document.getElementById('render-fractal-lg').dataset;
        //Object.assign(this.state.dataset, el.dataset)
        //for( var i in e.target.parentElement.parentElement.parentElement.lastElementChild.dataset )
          // el.setAttribute('data-'+, 'Hello World!');
     try {

     }
    catch (e) {

    }
  }

    onShow(){
              var sharefractal = document.getElementById('render-fractal-share');
                sharefractal.getContext('2d').drawImage(document.getElementById(this.state.fractal_el.id),0,0);
                try{

      }
      catch (e) {
            setTimeout(this.onShow, 4000);
      }
  }
  getSelectedElement(){
      if(this.state.fractal_el){
          return this.state.fractal_el;
      }
  }
  render() {

    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose} onShow={this.onShow} >
          <Modal.Header closeButton>
            <Modal.Title>
                {this.state.isShared ? 'Stop sharing your fractal' : 'Share your fractal'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
              <canvas width="300" height="300" id="render-fractal-share"></canvas>
              </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
              {this.state.isShared ? <FractalShare contract="FullContract" method="zurKombinationEntfernen" buttonText="Stop sharing this fractal"/> : <FractalShare contract="FullContract" method="zurKombinationFreigeben" buttonText="Share this fractal"/>}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default FractalShareControl;