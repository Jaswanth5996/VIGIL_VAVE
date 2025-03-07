import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Validation Schema
    const schema = yup.object().shape({
        telephone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone Number can't be empty"),
        otp: otpSent
            ? yup.string().length(6, "OTP must be exactly 6 digits").required("Enter a valid OTP")
            : yup.string(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const mobile = watch("telephone");

    // ✅ Send OTP Request
    const sendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/send-otp/", { mobile });
            setOtpSent(true);
            setValue("otp", ""); // Clear OTP field
            setError("");
        } catch (error) {
            setError("Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Verify OTP and Log in
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/verify-otp/", {
                mobile: data.telephone,
                otp: data.otp,
            });

            if (response.data.user_exists) {
                navigate("/third"); // ✅ Redirect existing users
            } else {
                navigate("/seccode"); // ✅ Redirect new users
            }
        } catch (error) {
            setError("Invalid OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Step 1 of 3</div>
                <div className="p">Login/Register with Phone Number</div>

                <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="input-box"
                    {...register("telephone")}
                    disabled={otpSent}
                />
                <p className="error">{errors.telephone?.message}</p>

                {!otpSent && (
                    <button className="otp" onClick={sendOtp} disabled={loading}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                )}

                {otpSent && (
                    <>
                        <input
                            type="number"
                            placeholder="Enter 6-digit OTP"
                            className="input-box"
                            {...register("otp")}
                        />
                        <p className="error">{errors.otp?.message}</p>
                        <button className="submit" onClick={handleSubmit(onSubmit)} disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
