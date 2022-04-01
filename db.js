const mongoose = require('mongoose');
mongoose.connect(process.env.mongoURI,()=>{
    console.log('connected to db');
});