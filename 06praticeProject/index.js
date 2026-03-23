const express=require('express')
const app=express()
const path=require('path')
const fs=require('fs')

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

//render index.ejs file 
app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files});
    })
})

//read file and show data in show.ejs file
app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,filedata)=>{
        res.render("show",{filename:req.params.filename,filedata:filedata});
    })
})

//to edit the file name
app.get('/edit/:filename',(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.New}`,(err)=>{
        res.redirect("/")
    })
})

//create a fiele in files folder 
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/")
    })
})

app.listen(3000, () => console.log("Server running"));