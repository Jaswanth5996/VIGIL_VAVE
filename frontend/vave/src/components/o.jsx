import React from "react";
import './App.css'


function Fg() {
    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Login/register with Phone number</div>
                <input type="tel" required className="input-box"/>
                <div className="p">We have sent you a 4-digit OTP</div>
                <div className="pp">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    );
}

export default Fg;
