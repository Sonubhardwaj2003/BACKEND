//server create
const express = require("express");

const app = express();

//mildware handling : 
/*
req → request object
res → response object
next() → very important
👉 next() tells Express:
“Go to next middleware or route”
If you don’t write next() → request will hang (browser loading) ❌
*/
app.use((req, res, next) => {
    console.log("Middleware 1 executed");
    next();
});

// for multiple mildware
app.use((req, res, next) => {
    console.log("Middleware 2 executed");
    next();
});


//routes creating :
//run using localhost:3000
//app.get(route(/),requestHandler(function(req,res){}))
app.get("/", (req, res) => {
    res.send("Hello from Express Server");
});

//run using localhost:3000/home
app.get("/home", (req, res) => {
    res.send("Hello from Express Server home ,after nodemon installation");
});

/*
//👉 Middleware only runs for /home
const checkAuth = (req, res, next) => {
    console.log("Auth Middleware");
    next();
};

app.get("/home", checkAuth, (req, res) => {
    res.send("Home Page");
});
*/


//error hanler
app.get("/profile", (req, res) => {
    return next(new Error("something wrong happening"))
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something went wrong");
})

//server start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


// this file(indexExpress) requires node-Module,package.json file etc. to run .
