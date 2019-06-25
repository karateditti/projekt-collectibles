import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class FractalDetailView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    window.FractalDetailView = this;
    this.state = {
      show: false,
        dataset: null
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(e) {
    this.setState({ show: true, fractal_el:e.target.parentElement.parentElement.parentElement.lastElementChild });
    var dataset = e.target.parentElement.parentElement.parentElement.lastElementChild;
    console.log(e.target.parentElement.parentElement.parentElement.lastElementChild);
    var lg_fractal = document.getElementById('render-fractal-lg');
    //lg_fractal.setAttribute('data-angle', dataset.getAttribute('angle'));
      setTimeout(eval, 500, 'fract.init("render-fractal-lg",550)');

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
  render() {
      var angle,arms,poly,segments,mirror, depth;
    if(this.state.fractal_el){

        angle =this.state.fractal_el.getAttribute('data-angle');
        arms =this.state.fractal_el.getAttribute('data-arms');
        poly =this.state.fractal_el.getAttribute('data-poly');
        segments =this.state.fractal_el.getAttribute('data-segments');
        mirror =this.state.fractal_el.getAttribute('data-mirror');
        depth =this.state.fractal_el.getAttribute('data-depth');
    }
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}  size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Fractal</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
              <canvas id="render-fractal-lg" width="550" height="550" data-angle={angle} data-arms={arms} data-poly={poly} data-segments={segments} data-mirror={mirror} data-depth={depth}></canvas>
              </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default FractalDetailView;