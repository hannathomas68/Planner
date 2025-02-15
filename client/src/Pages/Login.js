import React, { useState } from "react";
import "./Login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;