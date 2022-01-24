const mongoose = require('mongoose')

//The schema reflects the object fields and data-types we will use for each entry
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//connection instance to db
const connect = require('./../../db')

//transform received data for testing purposes
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//export our configuration consisting of the model, the person schema, and the collection
module.exports = mongoose.model('Person', personSchema, 'people')
