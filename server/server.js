const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ----------------------
// Alumni API
// ----------------------
app.get("/api/alumni", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "John Doe",
      branch: "CSE",
      batch: "2023",
      email: "john@gmail.com",
      company: "Google",
    },
    {
      _id: "2",
      name: "Sara Khan",
      branch: "ISE",
      batch: "2022",
      email: "sara@gmail.com",
      company: "Microsoft",
    },
  ]);
});

// ----------------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});