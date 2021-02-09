import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { Component, useState } from 'react';
import { isPropertySignature } from 'typescript';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck, Table, Row, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap'; 
import SignIn from './SignIn';


interface EditTrainingProps {
    name?: any;
    value?: any;
    admin?: boolean | null;
    show?: any;
    Footer?: any;
    Header?: any;
    ID: number;
  }
  
  interface EditTrainingSingle {
    title: string,
    time: string,
    description: string,
    hours: string,
    // owner: string,
    // userId: string,
    show: boolean,
  }
  
  interface EditTrainingState {
    Edittrainings: EditTrainingSingle[],
    show: true | false,
  }

  class EditTraining extends Component<EditTrainingProps, EditTrainingSingle>{
    constructor(props: EditTrainingProps) {
      super(props);
      

      const initialState: EditTrainingSingle[] = []
    
      this.state = {title: '', 
                    time: '',
                     description: '',
                      hours: '', 
                      show: false};

     this.fetchResults=this.fetchResults.bind(this)
     this.handleClose=this.handleClose.bind(this)
     this.handleShow=this.handleShow.bind(this)
    }
  
    componentDidMount() {
      
      
    }
  
    async fetchResults() {
      console.log("fetching results")
      const results = await fetch(`http://localhost:3001/training/${this.props.ID}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(EditTraining)
  
      })
      const jsonifyResults = await results.json()
      this.setState({show: false})
      console.log(EditTraining)
    
    }

    handleClose(show: React.MouseEvent) {
        this.setState({show: false})
      };

      handleShow(show: React.MouseEvent) {
          this.setState({show: true})
      };

render() {

return(
<>
    <Button variant="primary" onClick={this.handleShow}>
    EditTraining
  </Button>

  <Modal show={this.state.show} onHide={this.handleClose}>
    <ModalHeader closeButton>
      <h2>Modal heading</h2>
    </ModalHeader>
    <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
    <ModalFooter>
      <Button variant="secondary" onClick={this.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={this.fetchResults}>
        Save Changes
      </Button>
    </ModalFooter>
  </Modal>
</>
);
}
  }
export default EditTraining;