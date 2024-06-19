import React from 'react'
import styles from './Homepage.module.css'
import { Link, useNavigate } from 'react-router-dom'
const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src="" alt="" />
      <h1 >Welcome to <span className={styles.title}>Image Crafter</span></h1>
      <p>where your imaginatory picture is crafted by AI (powered by OpenAI)</p>
      <div className={styles.subcontainer}>
        <p>To use our service,</p>
        <button className={styles.signUpBtn} onClick={() => {navigate('./signup')}}>Sign up</button>
      </div>

      <div className={styles.subcontainer2}>
        <p>Already have an account? <span className={styles.logInBtn} onClick={() => navigate('./login')}>Log in</span></p>
      </div>
    </div>
  )
}

export default Homepage