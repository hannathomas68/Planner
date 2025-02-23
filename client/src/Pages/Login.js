import React, {useState} from "react";
import axios from "axios"; // to make HTTP requests
import "./Login.css";

const Login = ({onLogin}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/auth/login", {username, password})
            .then((response) => {
                if (response.data.success) {
                    onLogin(response.data.student); // pass student data to parent
                }
                else {
                    alert("Login failed."); // error handling
                }
            });
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