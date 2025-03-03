import React from "react";
import "../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

function Login() {
    const schema = yup.object().shape({
        telephone: yup
            .string()
            .matches(/^[0-9]+$/, "Phone number must consist only of digits (0-9)")
            .length(10,"Phone must be exactly 10 digits")
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
            <div className="p">Step 1 of 3</div>
                <div className="p">Login/Register with Phone number</div>
                <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="input-box"
                    {...register("telephone")}
                />
                <p className="error">{errors.telephone?.message}</p>
                <button className="otp" >Send OTP</button>
                <input
                    type="number"
                    placeholder="Enter 4-digit OTP"
                    className="input-box"
                    {...register("otp")}
                />
                <p className="error">{errors.otp?.message}</p>
                <button className="submit" onClick={handleSubmit(onSubmit)}>Submit</button>
            </div>
        </div>
    );
}

export default Login;
