const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sanjanauk@2004",
  database: "ai_based_interviewer_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Route: Get all interviews
app.get("/interviews", (req, res) => {
  db.query("SELECT * FROM interview", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Route: Register recruiter
app.post("/register", (req, res) => {
  const { recruiter_email, password } = req.body;

  if (!recruiter_email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  const checkQuery = "SELECT * FROM recruiter WHERE recruiter_email = ?";
  db.query(checkQuery, [recruiter_email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ error: "User already exists. Please try to login" });
    }

    const insertQuery = "INSERT INTO recruiter (recruiter_email, password) VALUES (?, ?)";
    db.query(insertQuery, [recruiter_email, password], (err, result) => {
      if (err) return res.status(500).json({ error: "Registration failed" });

      res.status(200).json({ success: true, message: "Registration successful" });
    });
  });
});

// Route: Recruiter login
app.post("/login", (req, res) => {
  const { recruiter_email, password } = req.body;

  if (!recruiter_email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  const loginQuery = "SELECT * FROM recruiter WHERE recruiter_email = ?";
  db.query(loginQuery, [recruiter_email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const storedPassword = results[0].password;

    if (storedPassword !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  });
});

// Route: fetchInterviews
app.post('/getInterviews', (req, res) => {
  const { recruiter_email } = req.body;

  if (!recruiter_email) {
    return res.status(400).json({ error: "Missing recruiter email" });
  }

  const query = `
    SELECT interview_id, interview_title, interview_link
    FROM interview
    WHERE recruiter_email = ?
  `;

  db.query(query, [recruiter_email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({ interviews: results });
  });
});

// createInterview
app.post("/createInterview", (req, res) => {
  const { interview_title, job_description, recruiter_email } = req.body;

  if (!interview_title || !job_description || !recruiter_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Step 1: Insert interview (without the link initially)
  const insertQuery = `
    INSERT INTO interview (interview_title, job_description, recruiter_email)
    VALUES (?, ?, ?)
  `;
  db.query(insertQuery, [interview_title, job_description, recruiter_email], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Failed to create interview" });
    }

    const interview_id = result.insertId;
    const interview_link = `http://localhost:5173/interview/${interview_id}`;

    // Step 2: Update the interview with the generated link
    const updateQuery = `
      UPDATE interview
      SET interview_link = ?
      WHERE interview_id = ?
    `;
    db.query(updateQuery, [interview_link, interview_id], (err2) => {
      if (err2) {
        console.error("Update error:", err2);
        return res.status(500).json({ error: "Failed to update interview link" });
      }

      return res.status(200).json({
        success: true,
        message: "Interview created",
        interview_id,
        interview_link
      });
    });
  });
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

// Route to get interview details by interview_id
app.get('/interviewDetails/:interview_id', (req, res) => {
  const { interview_id } = req.params;

  const query = 'SELECT * FROM interview WHERE interview_id = ?';
  db.query(query, [interview_id], (err, results) => {
      if (err) {
          console.error('Error fetching interview details:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
          res.status(404).json({ error: 'Interview not found' });
      } else {
          res.json(results[0]);
      }
  });
});

// ✅ Check if candidate already appeared for interview
app.post("/checkCandidate", (req, res) => {
  const { candidate_email, interview_id } = req.body;

  if (!candidate_email || !interview_id) {
    return res.status(400).json({ error: "Missing email or interview ID" });
  }

  const query = `
    SELECT * FROM candidate
    WHERE candidate_email = ? AND interview_id = ?
  `;

  db.query(query, [candidate_email, interview_id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      // 🔒 Candidate already exists for this interview
      return res.status(200).json({ exists: true });
    }

    // ✅ Candidate can proceed
    res.status(200).json({ exists: false });
  });
});



// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});