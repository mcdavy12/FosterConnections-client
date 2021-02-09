import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { Component, useState } from 'react';
import { isPropertySignature } from 'typescript';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck, Table, Row, Col} from 'reactstrap';
import SignIn from './SignIn';
import EditTraining from './EditTraining';
import Users from './Users';


interface TrainingProps {
  name?: any;
  value?: any;
  admin: boolean | null;
}

interface TrainingSingle {
  title: string,
  time: string,
  description: string,
  hours: string,
  owner: string,
  userId: string,
}

interface TrainingState {
  trainings: TrainingSingle[],
}

class Training extends Component<TrainingProps, TrainingState>{
  constructor(props: TrainingProps) {
    super(props);
    

    const initialState: TrainingSingle[] = []
  
  
    this.state = {trainings: initialState};

  
  }

  componentDidMount() {
    
    this.fetchResults()
    return (
      console.log("redirect successful")
    )
    
  }

  async fetchResults() {
    console.log("fetching results")
    const results = await fetch(`http://localhost:3001/training/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(Training)

    })
    const jsonifyResults = await results.json()
    this.setState({trainings: jsonifyResults})
    console.log(Training)
    

  
  }
  render() {
    
    const {trainings} = this.state;

    if(this.props.admin === false) {
      const result = trainings.map((t: any)=>
    <Card style={{ flex: 1, marginInline: '1em'}} >
    <CardBody style={{backgroundColor:"whitesmoke"}}>
      <CardTitle style={{textAlign: 'center'}}tag="h5">{t.title}</CardTitle>
      <CardSubtitle style={{textAlign:'center'}}tag="h5" className="mb-2 text-muted">{t.time}</CardSubtitle>
      <CardText style={{textAlign: 'center'}}>{t.description}</CardText>
      <Button>Register</Button>
    </CardBody>
  </Card>)

    return (
     <div className="wrapper2">
       <div>
        <h3 style={{position: 'absolute', left: '50%', top: '25%',
        transform: 'translate(-50%, -50%)'}}>Upcoming Trainings</h3>
      <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',  }}>
      {result}
    </CardDeck>
    <div style={{position: 'absolute', left: '20%', top: '10%'}}className={"button"}>
    <Link to="/SignIn">
    <button>Sign Out</button>
    </Link>
    </div>
    </div>
    </div>    
  )
  } else {
    const result = trainings.map((t: any)=>
    <Card style={{ flex: 1, marginInline: '1em'}} >
    <CardBody style={{backgroundColor:"whitesmoke"}}>
      <CardTitle style={{textAlign: 'center'}}tag="h5">{t.title}</CardTitle>
      <CardSubtitle style={{textAlign:'center'}}tag="h5" className="mb-2 text-muted">{t.time}</CardSubtitle>
      <CardText style={{textAlign: 'center'}}>{t.description}</CardText>
      
      <EditTraining ID={t.id}/>
      
    </CardBody>
  </Card>)
    return (
      <div className="wrapper2">
       <div>
        <h3 style={{position: 'absolute', left: '50%', top: '25%',
        transform: 'translate(-50%, -50%)'}}>Upcoming Trainings</h3>
      <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',position: 'absolute', left: '50%', top: '60%',
        transform: 'translate(-50%, -50%)',  }}>
      {result}
    </CardDeck>
    </div>
    <div className="Admin">
      <h1>Admin Page</h1>
    </div>
    <div className="addTraining">
      <Button style={{alignContent: "center", position: "relative", marginLeft: "-9.5%"}}>Add Training</Button>
    </div>
    
    <div className="viewUsers">
      <Link to={"/Users"}>
      <button>View Users</button>
      </Link>
      <div style={{position: 'absolute', right: '30%', bottom: '-200%'}}className={"button"}>
    <Link to="/SignIn">
    <button>Sign Out</button>
    </Link>
    </div>
     </div>
    </div>
    )     
}
  }
}

export default Training