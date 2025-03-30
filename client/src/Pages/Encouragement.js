import React, {useState, useEffect} from "react";
import "./Encouragement.css";

const Encouragement = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        try {
            const response = await fetch("https://api.quotable.io/random?tags=motivational"); // ChatGPT
            const data = await response.json();
            if (data && data.content && data.author) {
                setQuote(data.content);
                setAuthor(data.author);
            } else {
                console.error("Unexpected API response format:", data);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    return (
        <div className= "encouragementBkgrnd">
            <div className="encouragement">
                <h2>Encouragement</h2>
                <blockquote>"{quote}"</blockquote>
                <p className="author">- {author}</p>
                <button onClick={fetchQuote}>New Quote</button>
                <p>Inspirational quotes provided by <a href="https://quotable.io/" target="_blank" rel="noopener noreferrer">Quotable API</a></p>
            </div>
        </div>
    );

};

export default Encouragement;