const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDB',()=>{
    console.log('connected to db');
});