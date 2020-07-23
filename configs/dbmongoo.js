const mongoose = require('mongoose');
const MONGO_URI ="mongodb+srv://admin:admin@cluster0-adn4g.mongodb.net/dbDuAn?retryWrites=true&w=majority";
const connectDB = async()=>{
    const conn = await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true,

    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}
module.exports = connectDB;