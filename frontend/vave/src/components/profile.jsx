import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/vigilvave.png";
import styles from "../profile.module.css"; // ✅ Import module.css

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

    if (loading) return <div className={styles.loading}>Loading Profile...</div>;
    if (error) return <div className={styles.errorMessage}>{error}</div>;

    return (
        <div className={styles.profileContainer}>
            <img src={reactLogo} alt="Brand Logo" className={styles.brandLogo} />

            <div className={styles.profileCard}>
                <h2 className={styles.username}>{user.username}</h2>

                <div className={styles.profileInfo}>
                    <p className={styles.info}>📱 <strong>Mobile:</strong> {user.mobile}</p>

                    <h3 className={styles.sectionTitle}>📞 Trusted Contacts</h3>
                    <p className={styles.info}>{user.contact1}</p>
                    <p className={styles.info}>{user.contact2}</p>
                    <p className={styles.info}>{user.contact3}</p>

                    <h3 className={styles.sectionTitle}>🔑 Secret Code</h3>
                    <p className={styles.secretCode}>{user.secret_code}</p>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                    className={styles.logoutButton}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
