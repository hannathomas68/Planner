import React, {useState} from "react";
import axios from "axios";
import "./Signup.css";

const Signup = ({onAuthSuccess}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:5001/auth/signup", {firstName, lastName, username, password})
        .then((response) => {
            if (response.data.success) {
                onAuthSuccess(response.data.student); // pass student data to parent
            }
            else {
                alert("Signup failed."); // error handling
            }
        })
        .catch((error) => {
            console.error("Error during signup:", error);
        });
    };

    return(
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;