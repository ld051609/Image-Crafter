import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenerateImage from '../GenerateImage/GenerateImage'; // Import the GenerateImage component
import styles from './Login.module.css';

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await res.json();
      console.log(data);
      console.log(data.message);
      if (data.success) {
        setLoggedIn(true); // Update login status
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loggedIn ? ( // Render GenerateImage if logged in
        <GenerateImage />
      ) : (
        <form onSubmit={handleSubmit} className={styles.container}>
          <h1>Login</h1>
          <div className={styles.subcontainer}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Input email"
              required
              value={email}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.subcontainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Input password"
              required
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <button type="submit" className={styles.logInBtn}>
              Log in
            </button>
          </div>
          <div>
            <span>
              Do not have an account? <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
