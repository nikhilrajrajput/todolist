const express=require('express');
var app=express();
var mongoose = require('mongoose');
const User=require('./models/index.js');
const bodyParser= require('body-parser');
const async = require('hbs/lib/async');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/crud",{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

var connection=mongoose.connection;
connection.once('open',function(){
    console.log('Connection successful');
})
app.set('view engine','ejs');

app.get('/', function(req,res) {
    res.render('insert');
});

app.post('/insert', function(req,res){
    var user = new User({
        name: req.body.name,
        // email: req.body.email,
        // password: req.body.password
    })

    user.save(()=>{
        res.redirect('/show')
    })
});

app.get('/show',function(req,res){
    User.find({},function(err,result){
            
            res.render('show', {users:result});
    
    });
});

app.get('/edit/:id', function(req,res) {
    User.findById(req.params.id, function(err,result) {
        res.render('edit',{users:result})
        
    })
})

app.get('/delete/:id', async function(req,res){
  await  User.findByIdAndDelete(req.params.id)
  res.redirect('/show');
});

app.post("/update/:id",async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show')
})

var server=app.listen(4000,function () {
    console.log("Server is running at 4000")
});