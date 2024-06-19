import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import styles from './Signup.module.css'
const Signup = () => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: ''
  })
  const {username, email, password} = inputValue
  const handleOnChange = (e) => {
    const {name, value} = e.target
    setInputValue({
      ...inputValue,
      [name]: value
    })
  
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputValue)
      })
      if(!res.ok){
        throw new Error("Network response was not OK");
      } 
      const data= await res.json()
      console.log(data['message'])
      if(data['success']){
        navigate('/imageGeneration')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1>Sign up</h1>
        <div className={styles.subcontainer}>
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder='Username' 
            required 
            value={username}
            onChange={handleOnChange}/>

        </div>
        <div className={styles.subcontainer}>
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            id='email' 
            name='email' 
            placeholder='Email' 
            required 
            value={email}
            onChange={handleOnChange}/>

        </div>

        <div className={styles.subcontainer}>
          <label htmlFor="pasword">Password</label>
          <input 
          type="password" 
          id='password' 
          name='password' 
          placeholder='Password' 
          required 
          value={password}
          onChange={handleOnChange}/>
        </div>

          <button type='submit' className={styles.signupBtn}>Sign up</button>
          <span>Already have an account? <Link to={"/login"}>Log in</Link></span>
        </form>
    </div>
  )
}

export default Signup