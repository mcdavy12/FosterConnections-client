import { render } from "@testing-library/react";
import React from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram, isConstructorDeclaration } from "typescript";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Training from './Training';
import SignIn from './SignIn';
import { isInteger } from "formik";




interface SignUpProps {
    name?: any;
    value?: any;
    admin?: any;
    reviseToken?: any;
    userSetUp?: any;
 }
 interface SignUpState {
    email : string,
    password : string,
    firstName : string,
    lastName : string,
    phoneNumber : string,
    admin : boolean,
    userSetUp : boolean,
    redirect : string | null,
    errors : {
       email : string,
       password : string,
       firstName : string,
       lastName : string,
       phoneNumber : string,
       admin: boolean,
       userSetUp : boolean,
    }
 }
 

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  static props: any;

   
   constructor(props: SignUpProps) {
      super(props);
      const initialState = {
         email : '',
         password : '',
         firstName : '',
         lastName : '',
         phoneNumber : '',
         admin : false,
         userSetUp : true,
         redirect : null,
         errors : {
           email : '',
           password : '',
           firstName : '',
           lastName : '',
           phoneNumber : '',
           admin : false,
           userSetUp : true,
         } 
       }
       this.state = initialState;
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
      
   }


   handleChange = (event : any) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
      switch (name) {
        case 'email':
           errors.email = value.length < 0 ? 'Email is not valid!' : '';
           break;
        case 'password':
           errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
           break;
        default:
          break;
      }

      
      
    this.setState(Object.assign(this.state, { errors,[name]: value }));
    console.log(this.state.errors);
    }
    

    

    handleSubmit = async(event : any) => {
      event.preventDefault();
      
      const User = {
          user: {
           email: this.state.email,
           password: this.state.password,
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           phoneNumber: this.state.phoneNumber,
           admin: this.state.admin
          }
          
      }
        const fetchresults = await fetch(`http://localhost:3001/user/signup`, {
       method: 'POST',
       headers: new Headers({
           'Content-Type': 'application/json'
       }),
       body: JSON.stringify( User)
       
   })
   
       .then(response => response.json())
       .then(result => {
          console.log("User Created")
           this.props.reviseToken(result.sessionToken)   
           this.setState({userSetUp: true})
           this.setState({redirect: "/SignIn"})
       }
       ).catch(error => console.log('error', error));
       
      };
     render() {
      if(this.state.redirect){
         return<Redirect to ={this.state.redirect}/>
      }
        const {errors} = this.state
         return (
           <div className='wrapper'>
             <div className='form-wrapper'>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} noValidate >
                   <div className='email'>
                      <label htmlFor="email">Email</label>
                      <input type='email' name='email' onChange={this.handleChange}/>
                      {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
                   </div>
                   <div className='password'>
                      <label htmlFor="password">Password</label>
                      <input type='password' name='password' onChange={this.handleChange}/>
                      {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
                   </div>      
                   <div className='firstName'>
                      <label htmlFor="firstName">First Name</label>
                      <input type='firstName' name='firstName' onChange={this.handleChange}/>
                      </div>     
                   <div className='lastName'>
                      <label htmlFor="lastName">Last Name</label>
                      <br></br>
                      <input type='lastName' name='lastName' onChange={this.handleChange}/>
                      </div>   
                      <br></br>  
                   <div className='phoneNumber'>
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input type='phoneNumber' name='phoneNumber' onChange={this.handleChange}/>
                      </div>    
                   <div className='submit'>
                      <button>Sign Up</button>
                   </div>
              </form>
              <div>
              <Link to="SignIn"><button>
              Account Already?  Sign In!
            </button>
            </Link>
               </div>
               </div>
               </div>
     
      );
         }
      }


 export default SignUp;