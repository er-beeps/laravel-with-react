import React, { useState } from 'react';
import { API_BASE_URL,APP_BASE_URL } from '../constants';
import '../css/register.css';

import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const [error, setError] = useState(null);

const style = {
    margin: "30px 0 0 0"
}
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  let inputClass = "fluid-input";

  const focusField=(event)=>{

    const {value } = event.target;
      if(value === ""){
          event.target.parentElement.parentElement.classList.add('fluid-input--open');
          event.target.parentElement.parentElement.classList.add('fluid-input--focus');
      }
    }
   const blurField=(event)=>{

    const {value } = event.target;
      if(value === ""){
          event.target.parentElement.parentElement.classList.remove('fluid-input--open');
          event.target.parentElement.parentElement.classList.remove('fluid-input--focus');
        }else{
          event.target.parentElement.parentElement.classList.add('fluid-input--open');
          event.target.parentElement.parentElement.classList.add('fluid-input--focus');
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else {
      try {
        const response = await axios.post(API_BASE_URL+'register', {
          name,
          email,
          password,
        });

        console.log(response);
        if(response.data.success===true)
        {
            window.location.href=APP_BASE_URL+'login';
        }else{
            console.log(response.data.message)
        }
      } catch (error) {

        console.error(error.response.data);
      }
    }
  };

  return (
    <div className="register-container">
    <div className="title">
    Register as new user !!
    </div>
         <form onSubmit={handleSubmit}>
         {error && <p className="error">{error}</p>}

        <div className={inputClass} style={style}>
            <div className="fluid-input-holder">
                <input
                    className="fluid-input-input"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={focusField}
                    onBlur={blurField}
                />
                <label className='fluid-input-label' htmlFor="name">Full Name</label>

            </div>
        </div>
        <div className={inputClass} style={style}>
            <div className="fluid-input-holder">
                <input
                    className="fluid-input-input"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={focusField}
                    onBlur={blurField}
                />
                <label className='fluid-input-label' htmlFor="email">E-mail</label>
            </div>
        </div>

        <div className={inputClass} style={style}>
            <div className="fluid-input-holder">
                <input
                    className="fluid-input-input"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={focusField}
                    onBlur={blurField}
                />
                <label className='fluid-input-label' htmlFor="password">Password</label>

            </div>
        </div>
        <div className={inputClass} style={style}>
            <div className="fluid-input-holder">
                <input
                    className="fluid-input-input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={focusField}
                    onBlur={blurField}
                />
                <label className='fluid-input-label' htmlFor="confirmPassword">Confirm Password</label>

            </div>
        </div>
    <br />
    <div className='text-center'>
        <button className="register-button" type="submit">Sign In</button>
    </div>

    </form>
</div>
  );
}

export default Register;
