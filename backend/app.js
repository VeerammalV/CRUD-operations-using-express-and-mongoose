const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const contact = require("./routes/contact")
app.use("/api", contact);


//connect to mongodb
const connectToDb =async()=>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
    console.log('connected to database')
  } catch(error){
      console.log(error);
      process.exit(1);
  }
}

connectToDb();

const port = 3000;
app.listen(port, ()=>{
  console.log('listening to port 3000')
});


