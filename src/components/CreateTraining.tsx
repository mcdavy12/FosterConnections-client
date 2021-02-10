import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { Component, useState } from 'react';
import { isPropertySignature } from 'typescript';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck, Table, Row, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap'; 
import SignIn from './SignIn';


interface CreateTrainingProps {
    name?: any;
    value?: any;
    admin?: boolean | null;
    show?: any;
    Footer?: any;
    Header?: any;
    training: any;
    token: string;
  }
  
  interface CreateTrainingSingle {
    title: string,
    time: string,
    description: string,
    hours: string,
    // owner: string,
    // userId: string,
    show: boolean,
  }
  
  interface CreateTrainingState {
    Createtrainings: CreateTrainingSingle[],
    show: true | false,
  }

  class CreateTraining extends Component<CreateTrainingProps, CreateTrainingSingle>{
    constructor(props: CreateTrainingProps) {
      super(props);
      

      const initialState: CreateTrainingSingle[] = []
    
      this.state = {title: this.props.training.title, 
                    time: this.props.training.time,
                     description: this.props.training.description,
                      hours: this.props.training.hours, 
                      show: false};

     this.handleSubmit=this.handleSubmit.bind(this)
     this.handleClose=this.handleClose.bind(this)
     this.handleShow=this.handleShow.bind(this)
    }
  
    componentDidMount() {
      
      
    }
  
    async handleSubmit() {
      console.log("fetching results")
      const results = await fetch(`http://localhost:3001/training/`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        }),
        body: JSON.stringify({training: this.state})
  
      })
      const jsonifyResults = await results.json()
      this.setState({show: false})
    
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
    CreateTraining
  </Button>
   
  <Modal className="custom-modal-style"
isOpen={this.state.show} onHide={this.handleClose}>
    <ModalHeader closeButton>
      <h2>Create Training</h2>
    </ModalHeader>
    <ModalBody>
        
        <h4>Title</h4>
        <input value={this.state.title} onChange={e => this.setState({title: e.target.value})} style={{width: 450}}/>
        <h4>Time</h4>
        <input value={this.state.time} onChange={e => this.setState({time: e.target.value})}/>
        <h4>Description</h4>
        <input value={this.state.description} onChange={e => this.setState({description: e.target.value})} style={{width: 450}}/>
        
    </ModalBody>
    <ModalFooter>
    <Button variant="secondary" onClick={this.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={this.handleSubmit}>
        Save Changes
      </Button>
    </ModalFooter>
  </Modal>
  
</>
);
}
  }
export default CreateTraining;