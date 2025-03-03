import React from "react";
import "../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

function Login() {
    const schema = yup.object().shape({
        telephone: yup
            .string()
            .length(10, "Phone number must be exactly 10 digits")
            .required("Phone Number can't be empty"),
        otp: yup
            .string()
            .length(4, "OTP must be exactly 4 digits")
            .required("Enter a valid OTP"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
    };

    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Login/register with Phone number</div>
                <input
                    type="tel"
                    className="input-box"
                    {...register("telephone")}
                />
                <p className="error">{errors.telephone?.message}</p>

                <button className="otp" onClick={handleSubmit(onSubmit)}>Send OTP</button>

                <div >We have sent you a 4-digit OTP</div>

                <input
                    type="number"
                    className="input-box"
                    {...register("otp")}
                />
                <p className="error">{errors.otp?.message}</p>

                <div className="pp">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
