import React, {useState} from "react";
import axios from "axios";
import "./Signup.css";
import TimeWiseLogo from '../Images/TimeWise.png';

const Signup = ({onAuthSuccess}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:5001/auth/signup", {firstName, lastName, username, password})
        .then((response) => {
            if (response.data.success) {
                onAuthSuccess(response.data.student); // pass student data to parent
                setErrorMessage("");
            }
            else {
                setErrorMessage(response.data.message || "Signup failed."); 
            }
        })
        .catch((error) => {
            setErrorMessage("Username taken. Please try again."); // error handling
            console.error("Error during signup:", error);
        });
    };

    return(
        <div className="auth-page">
            <div className="signup">
                <img className = "logo-pic" src={TimeWiseLogo} alt="logo"/>
                <h2>Welcome to TimeWise!</h2>
                <h3>Create an account now.</h3>
                <form onSubmit={handleSubmit}>

                    {/* "required" shows user an alert if they leave any field blank.  */}
                    <div className="field">
                        <label>First Name: </label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/> 
                    </div>

                    <div className="field">
                        <label>Last Name: </label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                    </div>

                    <div className="field">
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>

                    <div className="field">
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                {errorMessage && <div className="alert-box">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default Signup;