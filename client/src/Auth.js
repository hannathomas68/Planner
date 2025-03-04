import React, {useState} from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Auth.css";

const Auth = ({onAuthSuccess}) => {

    const [isLogin, setIsLogin] = useState(true);

    // Switch between login/signup
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    // Show login page by default. Add a button below for the user to sign up. 
    // Show signup page if the button is clicked. Add a button below to login if the user already has an account.
    return(
        <div>
            {isLogin ? (<Login onLogin={(student) => onAuthSuccess(student)} />) : 
                (<Signup onAuthSuccess={(student) => onAuthSuccess(student)} />)
            }
            <button className="toggle-button" onClick={toggleAuthMode}>{isLogin ? 
            "Don't have an account? Sign up now!" : 
            "Already have an account? Login here!"}</button>
        </div>
    );
}

export default Auth;