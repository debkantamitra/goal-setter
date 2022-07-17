const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config;
const app = express();
const PORT = process.env.PORT || 4000;
const { errorHandler } = require("./middlewares/errorHandler");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log("server running on port:", PORT));
