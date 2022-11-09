const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connect is successful");
}).catch((e)=>{
    console.log(`Connection failed ${e}`);
})