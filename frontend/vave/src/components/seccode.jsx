import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const Secode = () => {
    const schema = yup.object().shape({
        mob1: yup.string()
            .matches(/^[0-9]+$/, "*Phone number must consist only of digits (0-9)")
            .length(10, "*Phone must be exactly 10 digits")
            .required("*Phone Number can't be empty"),
        mob2: yup.string()
            .matches(/^[0-9]+$/, "*Phone number must consist only of digits (0-9)")
            .length(10, "*Phone must be exactly 10 digits")
            .required("*Phone Number can't be empty"),
        mob3: yup.string()
            .matches(/^[0-9]+$/, "*Phone number must consist only of digits (0-9)")
            .length(10, "*Phone must be exactly 10 digits")
            .required("*Phone Number can't be empty"),
        secretcode: yup.string()
            .max(10, "*Secret code can be at most 10 characters long")
            .required("*Secret Code is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [drop, setDrop] = useState(false);
    const [drop1, setDrop1] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/detail", {
                user: 1,  
                contact1: data.mob1,
                contact2: data.mob2,
                contact3: data.mob3,
                secret_code: data.secretcode,
            });
    
            console.log("Data posted successfully:", response.data);
            setMessage("Data submitted successfully!");
            reset();
        } catch (error) {
            console.error("Full error response:", error.response);
            console.error("Error status:", error.response?.status);
            console.error("Error data:", error.response?.data);
            setMessage(`Failed to submit data: ${error.response?.status}`);
        }
    };
    

    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Step 2 of 3</div>

                <div className="drop">
                    <button onClick={() => setDrop(!drop)}>Add 3 trusted contacts {drop ? "▲" : "▼"}</button>
                    <br />
                    {drop && (
                        <>
                            <br />
                            <input type="tel" placeholder="Add mobile number 1" className="input-box" {...register("mob1")} />
                            <p className="error">{errors.mob1?.message}</p>

                            <input type="tel" placeholder="Add mobile number 2" className="input-box" {...register("mob2")} />
                            <p className="error">{errors.mob2?.message}</p>

                            <input type="tel" placeholder="Add mobile number 3" className="input-box" {...register("mob3")} />
                            <p className="error">{errors.mob3?.message}</p>
                        </>
                    )}
                </div>

                <br />

                <div>
                    <button onClick={() => setDrop1(!drop1)}>Add your Secret-Code {drop1 ? "▲" : "▼"}</button>
                    {drop1 && (
                        <>
                            <br />
                            <input type="text" placeholder="Enter your Secret Code" className="input-box" {...register("secretcode")} />
                            <p className="error">{errors.secretcode?.message}</p>
                        </>
                    )}
                </div>

                {message && <p style={{ color: message.includes("Failed") ? "red" : "green" }}>{message}</p>}

                <button className="submit" onClick={handleSubmit(onSubmit)}>Submit</button>
            </div>
        </div>
    );
};

export default Secode;
