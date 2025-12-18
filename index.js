const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des films ! Pour accéder aux films, visitez <a href='/api/movies'>/api/movies</a>");
});
app.use("/api/movies", require("./routes/movies"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
