const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Muhammad:$$$Cloud@cluster0.037ci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>{
    console.log('connected to db');
});