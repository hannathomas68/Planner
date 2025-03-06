import React, {useState} from "react";
import axios from "axios"; // to make HTTP requests
import {useNavigate} from "react-router-dom";
import "./Login.css";

const Login = ({onLogin}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/auth/login", {username, password}, {withCredentials: true})
            .then((response) => {
                if (response.data.success) {
                    onLogin(response.data.student); // pass student data to parent
                    navigate("/");
                }
                else {
                    alert("Login failed."); 
                }
            })
            .catch((error) => {
                setErrorMessage("Credentials incorrect. Please try again."); // error handling
                console.error("Error during signup:", error);
            });
    };

    return(
        <div className="auth-page">
            <div className="login">
                <h2>Welcome back to TimeWise!</h2>
                <h3>View your planner now.</h3>
                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="field">
                        <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button type="submit" className="login-button">Login</button>
                </form>
                {errorMessage && <div className="alert-box">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default Login;