const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://noumanfatta:%40bhoolgaya123@cluster0.hnjr4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>{
    console.log('connected to db');
});