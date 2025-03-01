import React, { useState } from "react";
import '../App.css'
// import {} from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import {useForm} from 'react-hook-form'

function Login() {
    const [number,setNumber]=useState(0)
    // // const schema = yup.object().shape({
    // //     telephone : yup.number().max(10).min(10).required("Phone Number can't be empty"),
    // //     otp: yup.number().integer().min(4).max(4).required("Enter a valid OTP"),
    // // }
    // )
    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Login/register with Phone number</div>
                <button>Send OTP</button>
                <input type="tel" required className="input-box" onChange={(e)=>  {setNumber(e.target.value); console.log(number)}}/>
                <div className="p">We have sent you a 4-digit OTP</div>
                {number}
                <div className="pp">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
