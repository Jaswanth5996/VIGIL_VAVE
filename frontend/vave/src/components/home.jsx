import { useState } from 'react'
import reactLogo from '../assets/vigilvave.png'
import '../App.css'

function Home() {
    return (
        <>
            <div className="main">
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
                <h1 className="des">WOMEN SAFETY DEVICE</h1>
                <button>Register</button>
            </div>
        </>
    )
}
export default Home;