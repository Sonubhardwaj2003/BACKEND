const express = require('express');
const app = express();

const userModel = require('./usermodel');

app.get('/', (req, res) => {
    res.send("Welcome .......");
});


// ✅ CREATE USER
app.get('/create', async (req, res) => {
    const user = await userModel.create({
        name: "Sonu",
        username: "sonu_2015",
        email: "sb9432024@gmail.com"
    });

    res.send(user);
});


// ✅ READ ALL USERS
app.get('/read', async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});


// ✅ UPDATE USER
app.get('/update', async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
        { username: "sonu_2015" },   // condition
        { name: "Sonu Updated" },    // new data
        { new: true }                // updated data return karega
    );

    res.send(updatedUser);
});


// ✅ DELETE USER
app.get('/delete', async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({
        username: "sonu_2015"
    });

    res.send(deletedUser);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});