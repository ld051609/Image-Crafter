import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
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
      const {success, data} = res.json()
      console.log(data)
      if(success){
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder='Input username' 
            required 
            value={username}
            onChange={handleOnChange}/>

        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            id='email' 
            name='email' 
            placeholder='Input email' 
            required 
            value={email}
            onChange={handleOnChange}/>

        </div>

        <div>
          <label htmlFor="pasword">Password</label>
          <input 
          type="text" 
          id='password' 
          name='pasword' 
          placeholder='Input password' 
          required 
          value={password}
          onChange={handleOnChange}/>
        </div>

          <button type='submit'>Sign up</button>
          <span>Already have an account</span>
        </form>
    </div>
  )
}

export default Signup