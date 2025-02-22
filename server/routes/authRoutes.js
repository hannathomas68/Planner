const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// New User Signup Route
router.post("/signup", async(req, res) => {
    const {firstName, lastName, username, password} = req.body;

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO Student(firstName, lastName, username, password) VALUES(?, ?, ?, ?)", 
        [firstName, lastName, username, hashedPassword],
        (err, result) => {
            if (err) {
                return res.status(500).json({error: "Error enrolling user"});
            }
            res.status(201).json({message: "User enrolled successfully"});
        }
    );
});

// Returning User Login Route
router.post("/login", (req, res) => {
    const {username, password} = req.body;

    db.query("SELECT * FROM Student WHERE username = ?", [username], async (err, results) => {
        if (err) {
            return res.status(500).json({error: "Database error"});
        }

        if (results.length === 0) {
            return res.status(401).json({error: "Invalid username or password"});
        }

        const student = results[0];

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({error: "Invalid username or password"});
        }

        // Store user's information in session
        req.session.student = {id: student.id, username: student.username};
        res.status(200).json({message: "Login successful", student: req.session.student});
    });
});

// Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: "Logout failed"});
        }
        res.status(200).json({message: "Logged out successfully"});
    });
});

module.exports = router;