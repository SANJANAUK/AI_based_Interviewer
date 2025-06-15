const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kimtaehyungie",
  database: "ai_based_interviewer_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Recruiter Login
app.post("/login", (req, res) => {
  const { recruiter_email, password } = req.body;
  if (!recruiter_email || !password)
    return res.status(400).json({ error: "Missing credentials" });

  db.query(
    "SELECT * FROM recruiter WHERE recruiter_email = ?",
    [recruiter_email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (results.length === 0 || results[0].password !== password)
        return res.status(401).json({ error: "Invalid credentials" });

      res.json({ success: true, message: "Login successful" });
    }
  );
});

// Recruiter Registration
app.post("/register", (req, res) => {
  const { recruiter_email, password } = req.body;
  if (!recruiter_email || !password)
    return res.status(400).json({ error: "Missing credentials" });

  db.query(
    "SELECT * FROM recruiter WHERE recruiter_email = ?",
    [recruiter_email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (results.length > 0)
        return res.status(400).json({ error: "User already exists" });

      db.query(
        "INSERT INTO recruiter (recruiter_email, password) VALUES (?, ?)",
        [recruiter_email, password],
        (err2) => {
          if (err2) return res.status(500).json({ error: "Registration failed" });
          res.json({ success: true, message: "Registration successful" });
        }
      );
    }
  );
});

// Get all interviews for a recruiter
app.get("/interviews/:recruiterEmail", (req, res) => {
  const { recruiterEmail } = req.params;
  const query = `
    SELECT interview_id, interview_title, interview_link 
    FROM interview 
    WHERE recruiter_email = ?
  `;
  db.query(query, [recruiterEmail], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ interviews: results });
  });
});

// Create Interview
app.post("/createInterview", (req, res) => {
  const { interview_title, job_description, recruiter_email } = req.body;
  if (!interview_title || !job_description || !recruiter_email)
    return res.status(400).json({ error: "Missing fields" });

  const insertQuery = `
    INSERT INTO interview (interview_title, job_description, recruiter_email)
    VALUES (?, ?, ?)
  `;
  db.query(
    insertQuery,
    [interview_title, job_description, recruiter_email],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Insert failed" });

      const interview_id = result.insertId;
      const interview_link = `http://localhost:3000/interview/${interview_id}`;

      const updateQuery = `
        UPDATE interview SET interview_link = ? WHERE interview_id = ?
      `;
      db.query(updateQuery, [interview_link, interview_id], (err2) => {
        if (err2) return res.status(500).json({ error: "Update link failed" });

        res.json({
          success: true,
          interview_id,
          interview_link
        });
      });
    }
  );
});

// Fetch candidates for a given interview_id
app.get("/candidates/:interview_id", (req, res) => {
  const { interview_id } = req.params;
  const query = `
    SELECT candidate_email, score, is_evaluated 
    FROM candidate 
    WHERE interview_id = ?
  `;
  db.query(query, [interview_id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ candidates: results });
  });
});

// Accept a candidate
app.post("/candidates/accept", (req, res) => {
  const { candidate_email, interview_id } = req.body;
  const query = `
    UPDATE candidate SET is_evaluated = true 
    WHERE candidate_email = ? AND interview_id = ?
  `;
  db.query(query, [candidate_email, interview_id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ success: true });
  });
});

// Reject a candidate (delete)
app.post("/candidates/reject", (req, res) => {
  const { candidate_email, interview_id } = req.body;
  const query = `
    DELETE FROM candidate 
    WHERE candidate_email = ? AND interview_id = ?
  `;
  db.query(query, [candidate_email, interview_id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ success: true });
  });
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
