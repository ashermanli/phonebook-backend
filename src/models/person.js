const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.MONGODB_URI;
console.log("connecting to ", db);

const connectDB = ()=>{
  try {
     mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log("Conntected to MongoDB")
  }
  catch(error){
    console.log("we reached an error")
    console.log("error connecting to MongoDB");
    console.log(error.message)
    process.exit(1)
  }
}


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = {
  pers: mongoose.model("Person", personSchema),
  connect: connectDB
}
