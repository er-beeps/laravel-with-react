import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../css/login.css';
import { API_BASE_URL } from '../constants';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
    
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


  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data here
    if (formData.username.length === 0) {
      setError('Username must not be empty!!');
      return;
    }

    if (formData.password.length === 0) {
      setError('Password must not be empty !!');
      return;
    }

    // Send form data to server for validation
    fetch(API_BASE_URL+'login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Redirect to dashboard or show success message
          localStorage.setItem("token", data.token);
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        } else {
          setError(data.error);
          alert(Object.values(data).toString());
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
      });
  };


  return (

    <div className="login-container">
        <div className="title">
        Login
        </div>
             <form onSubmit={handleSubmit}>
             {error && <p className="error">{error}</p>}
            <div className={inputClass} style={style}>
                <div className="fluid-input-holder">
                    <input
                        className="fluid-input-input"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onFocus={focusField}
                        onBlur={blurField}
                    />
                    <label className='fluid-input-label' htmlFor="username">Username</label>

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
        <br />
        <div className='text-center'>
            <button className="login-button" type="submit">Log in</button>
        </div>

        </form>
    </div>
  );
}

export default LoginForm;
