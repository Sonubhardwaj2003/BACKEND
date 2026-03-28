const express=require('express')
const app=express()

const userModel=require('./models/user')
const path=require('path')
const cookieparser=require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieparser())

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    let user = userModel.findOne({email:req.body.email})
    if(!user){
        return res.send('Something went wrong')
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {        
        if(result){
            const token = jwt.sign({ email: user.email }, 'secret_key');
            res.cookie('token', token, { httpOnly: true });
            res.send('Login successful')
        }        
        else{
            res.send('Invalid credentials')
        }
    });

})

app.post('/create', async (req,res)=>{
    let {username,email,password,age} = req.body

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
           let userCreated = await userModel.create({
                username,
                email,
                password:hash,
                age
            })

            const token = jwt.sign({ email }, 'secret_key');
            res.cookie('token', token, { httpOnly: true });
            res.send(userCreated)
        });
    });

})

app.get('/logout', async (req,res)=>{
    res.clearCookie('token');
    res.send('Logged out successfully');
    res.redirect('/')
});


app.listen(3000);