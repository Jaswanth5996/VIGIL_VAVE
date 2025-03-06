import axios from "axios"; 
import { useState, useEffect } from "react";

const Final = () => {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/detail")
          .then((response) => {
              console.log("API Response:", response.data); // ✅ Debugging log
              if (response.data.length > 0) {
                  setDetails(response.data[0]);  // ✅ Fix if API returns an array
              } else {
                  setError("No data available.");
              }
          })
          .catch((error) => {
              console.error("Full Error Object:", error); // ✅ Log entire error
              console.error("Error Status:", error.response?.status);
              console.error("Error Message:", error.message);
              setError(`Failed to load details: ${error.message}`);
          });
    }, []);

    return (
        <div className="container">
            <div className="login-box">
                <div className="p">Step 3 of 3</div>
                {error ? <p style={{ color: "red" }}>{error}</p> : null}
                <h1>{details?.secret_code || "Loading..."}</h1> 
            </div>
        </div>
    );
};

export default Final;
