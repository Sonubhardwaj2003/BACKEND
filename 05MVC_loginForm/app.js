const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// use routes
app.use("/", authRoutes);

app.listen(3000, () => console.log("Server running"));