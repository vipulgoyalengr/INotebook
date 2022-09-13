import React, { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [credentials,setcredentials]=useState({email:"",password:""})
    let history=useNavigate();
    const hancleClick=async (e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:2001/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
               body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json();
          console.log(json)
          if(json.authtoken){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login Successful","success");
            history('/')
            
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const OnChange =async (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})

    }
  return (
    <div>
<form onSubmit={hancleClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} id="email" onChange={OnChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={OnChange} id="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>    </div>
  )
}

export default Login
