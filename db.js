const mongoose = require('mongoose');
const uri = 'mongodb+srv://noumanfatta:bhoolgaya@cluster0.gqtlc.mongodb.net/myDB?retryWrites=true&w=majority';
mongoose.connect(uri,()=>{
    console.log('connected to db');
});