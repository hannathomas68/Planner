const express = require("express");
const db = require("../db");
const router = express.Router();

// Add Calendar Event Route
router.post("/add", (req, res) => {
    const {studentId, title, description, startTime, endTime} = req.body;

    db.query("INSERT INTO Event(studentId, title, description, startTime, endTime) VALUES (?, ?, ?, ?, ?)",
        [studentId, title, description, startTime, endTime],
        (err, result) => {
            if (err) {
                return res.status(500).json({success: false, message: "Database error"});
            }
            res.json({success: true, message: "Event added successfully"});
        }
    );
});

// Fetch Calendar Event Route
router.get("/:studentId", (req, res) => {
    const {studentId} = req.params;

    db.query("SELECT * FROM Event WHERE studentId = ?", [studentId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: "Database error"});
        }
        res.json(results);
    });
});

module.exports = router;