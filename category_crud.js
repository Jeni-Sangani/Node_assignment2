// app.js
const express = require('express');
const bodyParser = require('body-parser');
var path=require('path');
var Category=require('./category_schema');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('view'));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/product_db", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// Insert Data
app.get('/AddCategory',function(req,res)
{ 
    //res.sendFile('login.html');
    res.sendFile(path.resolve(__dirname, 'view', 'AddCategory.html'));
});

app.post('/AddCategory', (req, res) => {
 var Categorydata = new Category({
  	cat_name:req.body.cat_name
  
  	});
  

  Categorydata.save()
    .then(item => {
      res.send("Category saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});
// END INSERT Data

//show Data
app.get("/show",(req,res)=>
{
Category.find(function(err,Users)
{
if(err)
{
  return err;
}
console.log(Users);
res.send(Users);
});
});
//End Show Data


//Search
app.get("/Category_search/:id",(req,res)=>
{
Category.findById(req.params.id,function(err,Users)
{
if(err)
{
  return err;
}
console.log(Users);
res.send(Users);
});
});
//search

//Update
// User.findOneAndUpdate({firstName: "jenisha"}
// , {$set: {firstName: "pihu"}}
// , function (err, Users) {
//     if (err) {
//         console.log("update document error");

//     } else {
//         console.log("update document success");
//         console.log(Users);
//     }
// });

app.get("/user_update/:id",(req,res)=>
{
   var myData = new User({
    firstName:'pooja',
    lastNameName:'patel'
    });
User.findAndModify(req.params.id,myData,function(err,Users)
{
if(err)
{
  return err;
}
console.log(Users);
res.send(Users);
});
});
//Update

//Delete


app.get("/DeleteCategory/:id",(req,res)=>
{
Category.findOneAndRemove(req.params.id,function(err,Category)
{
if(err)
{
  return err;
}
console.log("Category Is deleted with ID:".Category._id);
res.send(Users);
});
});
//Delete
app.listen(8000, () => console.info('Application running on port 8000'));