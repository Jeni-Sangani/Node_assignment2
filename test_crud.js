var express=require("express");
var mongoose=require("mongoose");
var bodyParser = require('body-parser');
var path=require("path");
mongoose.connect('mongodb://localhost:27017/sample1',{useNewUrlParser:true});
var db=mongoose.connection;

var app=express();
app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
//create shema
var categoryschema=mongoose.Schema({
    
    cat_name:{
        type:String,
        require:true
    }
});
var category=mongoose.model("Category",categoryschema,"Categoryes");

var productschema=mongoose.Schema({
   
    pro_name:{
        type:String,
        require:true
    },
    pro_price:
    {
        type:Number,
        require:true
    },
    cat_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    }
});
var product=mongoose.model("Product",productschema,"Products");

//add
app.get('/addcategory',(req,res)=>{
    var cat=new category({
        
        cat_name:'cloth'
    });
    cat.save().then(item=>{
        res.send('item save');
    });
    
});
app.get('/showcategory',(req,res)=>{
    category.find((err,result)=>{
    res.send(result);
    });
});
app.get('/addproduct',(req,res)=>{
   
    category.find((err,result)=>{
        if(err)
        {

        }
        else{
            res.render('addpro.ejs',{cats:result});
        }
    });
   
});
app.post('/addproduct',function(req, res){
    console.log(req.body.productname);
//     var prod=new product({
//          pro_name:req.body.proname,
//         pro_price:req.body.proprice,
//          cat_id:req.body.cat_combo
//     });   
    
//    prod.save().then(item=>{res.send('item save'); });
        
});
app.get('/add',(req,res)=>{
    res.render('add.ejs');
});
app.post('/add',(req ,res)=>{
 console.log(req.body.proname);
});
app.listen(8080);