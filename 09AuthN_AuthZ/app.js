const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser());

//st cookies
app.get('/', (req, res) => {
    res.cookie("name", "sonu", {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        secure: true
    });
    res.send("Cookie set");
});

//read cookie
app.get('/readcookie', (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
});

//delete cookie
app.get('/deletecookie', (req, res) => {
    res.clearCookie("name");
    res.send("Cookie deleted");
});

// 🔐 HASH PASSWORD (Signup Demo)
app.get('/hash', async (req, res) => {
    const password = "12345";
    const hash = await bcrypt.hash(password, 10);
    res.send(hash);

});

// 🔑 LOGIN → JWT Generate → Cookie Set
app.get('/login', async (req, res) => {
    const password = "12345";
    // assume ye DB me stored hash hai
    const storedHash = await bcrypt.hash("12345", 10);
    const match = await bcrypt.compare(password, storedHash);
    if (match) {

        const token = jwt.sign(
            { userid: "101", name: "sonu" },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.cookie("token", token);
        res.send("Login Success + JWT Cookie Set");
    } else {
        res.send("Wrong Password");
    }
});


// 🔎 PROTECTED ROUTE → JWT VERIFY → DATA NIKALO
app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    try {
        const data = jwt.verify(token, "secretkey");
        res.send(data);

    } catch (err) {
        res.send("Invalid Token");
    }
});


// 🚪 LOGOUT → Cookie Delete
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.send("Logout Done");
});

app.listen(3000);