const { findUser } = require("../models/userModel");

const getLogin = (req, res) => {
    res.render("login");
};

const postLogin = (req, res) => {
    const { username, password } = req.body;

    const user = findUser(username, password);

    if (user) {
        res.render("dashboard", { user: username });
    } else {
        res.send("Invalid Credentials");
    }
};

module.exports = { getLogin, postLogin };