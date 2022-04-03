const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/publications", require("./routes/api/publications"));
app.use("/api/discuss", require("./routes/api/discuss"));
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/notifications", require("./routes/api/notifications"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
