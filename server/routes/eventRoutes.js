const express = require("express");
const db = require("../db");
const router = express.Router();

// Add Calendar Event Route
router.post("/add", (req, res) => {
    const {studentId, title, description, date, startTime, endTime} = req.body;

    db.query("INSERT INTO Event(studentId, title, description, date, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)",
        [studentId, title, description, date, startTime, endTime],
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

// Delete Calendar Event Route
router.delete("/delete/:eventId", (req, res) => {
    const {eventId} = req.params;

    db.query("DELETE FROM Event WHERE id = ?", [eventId], (err, result) => {
        if (err) {
            return res.status(500).json({success: false, message: "Database error"});
        }
        res.json({success: true});
    });
});

module.exports = router;