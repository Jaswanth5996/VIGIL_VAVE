import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/vigilvave.png";
import "../App.css"; // ✅ Import external CSS

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };

                const response = await axios.get("http://127.0.0.1:8000/api/profile/", { headers });

                setUser(response.data);
            } catch (err) {
                setError("Unauthorized. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) return <div className="loading">Loading Profile...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="profile-container">
            <img src={reactLogo} alt="Brand Logo" className="brand-logo" />

            <div className="profile-card">
                <h2 className="username">{user.username}</h2>

                <div className="profile-info">
                    <p className="info"><strong>📱 Mobile:</strong> {user.mobile}</p>

                    <h3 className="section-title">📞 Trusted Contacts</h3>
                    <p className="info">{user.contact1}</p>
                    <p className="info">{user.contact2}</p>
                    <p className="info">{user.contact3}</p>

                    <h3 className="section-title">🔑 Secret Code</h3>
                    <p className="secret-code">{user.secret_code}</p>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
