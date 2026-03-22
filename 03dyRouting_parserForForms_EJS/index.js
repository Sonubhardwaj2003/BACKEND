//server create
const express=require('express');
const app = express();
const path=require('path'); // for static file static , path for directry

//settings up parsers for form : handles the orm data on backend
app.use(express.json()); //read json data
app.use(express.urlencoded({extended : true})); // read normal form data 

//setting up static files :with this we can use images,css , js files in our module
app.use(express.static(path.join(__dirname,'public')));

//ejs setup : can reder ejs pages
app.set('view engine','ejs');

//mildware : function
app.use((req, res, next) => {
    console.log("Middleware 1 executed");
    next();
});

//routes 
app.get("/",(req,res)=>{
    res.send("Chal rha hai-----ejs file ko check karne k liye localhost:3000/ejsFile pr jaye .")
})

//route for ejs file
app.get("/ejsFile",(req,res)=>{
    res.render("name")
})

//dynamic routes : after colons part it make it as dynamic 
app.get("/profile/:username",(req,res)=>{
    res.send(`Welcome , ${req.params.username}`);
})

//multiple dynamic routes
app.get("/profile/:username/:age",(req,res)=>{
    res.send(`Welcome , ${req.params.username} of age ${req.params.age}`);
})

//server start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

