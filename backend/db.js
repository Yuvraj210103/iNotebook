const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://yuvraj:yuvraj@cluster0.qg1wt5t.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to database");
    })
}

module.exports = connectToMongo;