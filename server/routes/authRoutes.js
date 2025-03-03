const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// New User Signup Route
router.post("/signup", async(req, res) => {
    try {
        const {firstName, lastName, username, password} = req.body;

        // Check if username already exists
        db.query("SELECT * FROM Student WHERE username = ?", [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "Username already exists" });
            }

        // Hash password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query("INSERT INTO Student(firstName, lastName, username, password) VALUES(?, ?, ?, ?)", 
            [firstName, lastName, username, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error("Database Insert Error:", err);
                    return res.status(500).json({error: "Error enrolling user"});
                }
                req.session.student = {id: result.insertId, username};
                res.status(201).json({success: true, student: req.session.student});
            }
        );
    });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
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
        req.session.save(err => {
            if (err) {
                return res.status(500).json({error: "Session error"});
            }
        })
        res.status(200).json({success: true, message: "Login successful", student: req.session.student});
    });
});

// Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: "Logout failed"});
        }
        res.clearCookie("connect.sid"); // Clear session cookie
        res.status(200).json({message: "Logged out successfully"});
    });
});

// Check authentication route
router.get("/check-auth", (req, res) => {
    if (req.session.student) {
        res.json({loggedIn: true, student: req.session.student});
    }
    else {
        res.json({loggedIn: false});
    }
});

module.exports = router;