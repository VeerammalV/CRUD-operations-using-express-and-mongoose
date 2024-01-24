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
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb',
    // {
    //   useNewUrlparser:true,
    //   useUnifiedTopology:true
    // }
    );
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


// // const mongoose = require('mongoose');
//  const express = require ('express');
//  const app = express();

// // // create connection
// // mongoose.connect("mongodb://localhost:27017/mydb",{
// //     useNewUrlParser:true, useUnifiedTopology:true}
// //     .then
// // )

// // app.listen(5000, ()=>{console.log('listening to port 5000')})

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// app.listen(5000, ()=>{console.log('listening to port 5000')})

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// const mongoDB = "mongodb://localhost:27017/bookstore";

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
//   console.log("database connected")
// }


//schema
// const playlistSchema = new mongoose.Schema({
//     name: String, ctype: String, videos: Number, author: String, active:Boolean,
//     date:{
//         type:Date,
//         default:Date.now()
//     }
// })

//model
// const Playlist = new mongoose.model("")

