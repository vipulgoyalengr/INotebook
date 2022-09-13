import React, { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
const Signup = (props) => {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();
    const hancleClick=async (e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:2001/api/auth/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
               body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const json=await response.json();
          console.log(json)
          if(json.authtoken){
            localStorage.setItem('token',json.authtoken);
            history('/')
            props.showAlert("Account Created Successfully","success");

          }
          else{
            props.showAlert("Invalid Details","danger");
          }
    }
    const OnChange =async (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={hancleClick}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={OnChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={OnChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' id="password" onChange={OnChange} minLength={8} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={OnChange} minLength={8} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
