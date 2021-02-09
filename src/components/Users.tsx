import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { Component, useState } from 'react';
import { isPropertySignature } from 'typescript';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import {Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck, Table, Row, Col, Container,} from 'reactstrap';
import SignIn from './SignIn';

interface UsersProps {
    name?: any;
    value?: any;
    admin?: any;
    reviseToken?: any;
    userSetUp?: any;
 }
 interface SingleUser {
    email : string,
    password : string,
    firstName : string,
    lastName : string,
    phoneNumber : string,
    admin : boolean,
    userSetUp : boolean,
    }

    interface UserState {
        users: SingleUser[]
    }
   
 
 

class Users extends React.Component<UsersProps, UserState> {
   constructor(props: UsersProps) {
      super(props);

      const initialState: SingleUser[]=[]

      this.state = {users: initialState}

       
      
   }

    componentDidMount() {
     this.fetchResults()
      return(
        Users
      )
    }
      async fetchResults() {
        console.log("fetching results")
        const results = await fetch(`http://localhost:3001/user/`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(Users)
    
        })
        const jsonifyResults = await results.json()
        this.setState({users: jsonifyResults})
        console.log(Users)
      
        // .then(response => response.json())
        // .then(result => {
        //     this.props.reviseToken(result.sessionToken) 
        //           }
        // ).catch(error => console.log('error', error));
        }
  
      render() {
         const {users} = this.state;
            const result = users.map((u: any)=>
            <Card style={{ flex: 5, marginInline: '1em',}} >
            <CardBody style={{display: "inline-table",  backgroundColor:"whitesmoke"}}>
              <CardTitle style={{textAlign: 'center'}}tag="h5">Name: {u.firstName}  {u.lastName}</CardTitle>
              <CardSubtitle style={{textAlign:'center'}}tag="h5" className="mb-2 text-muted"> Email: {u.email}</CardSubtitle>
              <CardText style={{textAlign: 'center'}}> Phone Number:{u.phoneNumber}</CardText>
            </CardBody>
          </Card>)
         
          return (
            <div className="wrapper2">
             <div>
                <h3 style={{position: 'absolute', left: '50%', top: '25%',
                  transform: 'translate(-50%, -50%)'}}>All Users</h3>
                <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',position: 'absolute', left: '50%', top: '60%',
        transform: 'translate(-50%, -50%)',  }}>
                  {result}
                </CardDeck>
                <div className="backtoAdmin">
              <Link to="/Training"><button style={{position: "relative", marginBottom: "260%", marginRight: "-50%"}}>Back to Admin Home</button></Link>
              </div>
              </div>
              </div>
              
            

              
               
          )
      }
    };
  

    export default Users