var express=require("express");
var mongoose=require("mongoose");
var path=require("path");
var bodyparser=require("body-parser");
var session=require("express-session");
var filestore=require("session-file-store");

var app=express();
mongoose.connect("mongodb://localhost:27017/sample",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({
   secret:'sdfg',
   saveUninitialized:false,
   resave:false 
}));
mongoose.set('useFindAndModify',true);
var db=mongoose.connection;
app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');

//create schema
var adminschema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength:6,
        maxlength:8
    }
});
var admin=mongoose.model("Admin",adminschema,"Admins");
//login
app.get('/login',(req,res)=>{
    res.render('login.ejs');
});
//login post
app.post('/login',(req,res)=>{
    var uname=req.body.uname;
    var pass=req.body.pass;
    if(uname=='jeni' && pass=='jeni123')
    {
           
               
                    req.session.loggedin=true;
                    req.session.uname=uname;
                    res.redirect('/home');
    }
    else{
        res.redirect('/login');
    }
});
app.get('/home',(req,res)=>{
    res.send('hii');
});
app.listen(8000);