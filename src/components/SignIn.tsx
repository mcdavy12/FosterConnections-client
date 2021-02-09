import { render } from "@testing-library/react";
import React from "react";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Training from './Training';
import SignUp from './SignUp';




interface SignInProps {
    name?: any;
    value?: any;
    admin?: any;
    reviseToken?: any;
    reviseAdmin: (newAdmin: boolean | null) => void;
 }
 interface SignInState {
    email : string,
    password : string,
    admin : boolean,
    sessionToken : string,
    redirect: string | null,
    errors : {
       email : string,
       password : string
       admin: boolean,
       sessionToken : string,
    }
 }
 
 
 export class SignIn extends React.Component<SignInProps, SignInState> {
   static props: any;

    
    constructor(props: SignInProps) {
       super(props);
       const initialState = {
          email : '',
          password : '',
          admin : false,
          sessionToken : '',
          redirect: null,
          errors : {
            email : '',
            password : '',
            admin : false,
            sessionToken : '',
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
            admin: this.state.admin
           }
           
       }
         const fetchresults = await fetch(`http://localhost:3001/user/signin`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify( User)
        
    })
    
        .then(response => response.json())
        .then(result => {
            this.props.reviseToken(result.sessionToken)   
            this.props.reviseAdmin(result.user.admin)
            this.setState({redirect: "/Training"})
        }
        ).catch(error => console.log('error', error));
        
        
     }

     render() {
        if(this.state.redirect){
           return<Redirect to ={this.state.redirect}/>
        }
        const {errors} = this.state
         return (
           <div className='wrapper'>
             <div className='form-wrapper'>
                <h2>Sign In</h2>
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
                   <div className='submit'>
                      <button>Sign In</button>
                   </div>
              </form>
              <div>
              <Link to="/SignUp"><button>
              No Account?  Sign Up!
            </button>
            </Link>
               </div>
               </div>
               </div>
     
      )
         }
      };



 export default SignIn;
