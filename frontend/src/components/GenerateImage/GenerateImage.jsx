import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styles from './GenerateImage.module.css';
const GenerateImage = () => {
    const navigate = useNavigate()
    const [cookies, removeCookie] = useCookies([])
    const [username, setUsername] = useState('')

    useEffect(() => {
        const verifyCookie = async() => {
            if(!cookies.jwtToken){
                navigate('/login')
            }
            try {
                const {data} = await axios.post(
                    'http://localhost:8080',
                    {},
                    {withCredentials: true}
                );
                const {status, username} = data;
                if(status){
                    setUsername(username)
                } else {
                    removeCookie('jwtToken')
                    navigate('/login')
                }
                
            } catch (error) {
                console.log('Verification error:', error)
                removeCookie('jwtToken')
                navigate('/login')
                
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie])




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

    const Logout = () => {
        removeCookie('jwtToken')
        navigate('/signup')
    }

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

        <button className={styles.logoutBtn} onClick={Logout}>Log out</button>

    </div>
  )
}

export default GenerateImage