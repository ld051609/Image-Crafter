import React from 'react'
import { useState } from 'react'
const GenerateImage = () => {
    const [input, setInput] = useState('')
    const [imgUrl, setImgUrl] = useState('')    
    const handleOnChange = (e) => {
        setInput(e.target.value)
    }
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/createImg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({prompt: input})
            })
            if(!res.ok){
                throw new Error("Network response was not OK");
            }
            const data = await res.json()
            console.log(`Generated Image Data: ${data}`)
            setImgUrl(data)
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div>
            <input 
            type="text" 
            required 
            placeholder='Giving a prompt for image generation'
            onChange={handleOnChange}
            value={input}
            />
            <button type='submit' onSubmit={handleOnSubmit}>Generate AI Image</button>

        </div>

        <div>
            <img src={imgUrl} alt="Generated AI Image" />
        </div>

    </div>
  )
}

export default GenerateImage