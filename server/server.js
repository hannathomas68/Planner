require('dotenv').config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json()); // parses incoming JSON
app.use(cors({origin: "http://localhost:3000", credentials:true})); // allows frontend to communicate w backend

// Session-based authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true, sameSite: "lax"}
}));

app.use("/auth", authRoutes);

app.get('/check-auth', (req, res) => {
    if (req.session.username) {
        res.json({ authenticated: true, user: req.session.username });
    } else {
        res.json({ authenticated: false });
    }
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
});