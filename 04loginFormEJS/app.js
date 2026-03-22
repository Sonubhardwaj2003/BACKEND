const express = require("express");
const app = express();

// parsers
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.set("view engine", "ejs");

// GET Login Page(login.ejs page render)
app.get("/", (req, res) => {
    res.render("login");
});

// POST Login Form
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // dummy authentication
    if (username === "sonu" && password === "123") {
        res.render("dashboard", { user: username });
    } else {
        res.send("Invalid Credentials");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});