import React from 'react'
import { useState } from 'react'
import styles from './GenerateImage.module.css'
const GenerateImage = () => {
    const [input, setInput] = useState('')
    const [imgUrl, setImgUrl] = useState('')    
    const handleOnChange = (e) => {
        setInput(e.target.value)
    }
    const handleOnClick = async (e) => {
        e.preventDefault();
        console.log(`Input: ${input}`);
        try {
            const res = await fetch("http://localhost:8080/createImg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputPrompt: input }) // Ensure key matches the server's expected key
            });
            console.log(res);
            if (!res.ok) {
                throw new Error("Network response was not OK");
            }
            const data = await res.json();
            console.log(`Generated Image Data: ${data.image_url}`);
            setImgUrl(data.image_url);
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div className={styles.container}>
        <div className={styles.inputBox}>
            <input 
            type="text" 
            required 
            placeholder='Giving a prompt for image generation'
            onChange={handleOnChange}
            value={input}
            className={styles.input}
            />
            <button onClick={handleOnClick} className={styles.btn}>Generate AI Image</button>

        </div>

        <div className={styles.imgBox}>
            <img src={imgUrl} alt="" />
        </div>

    </div>
  )
}

export default GenerateImage