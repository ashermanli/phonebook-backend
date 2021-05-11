const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const connect = require('./../../db')

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//export our configuration consisting of the model, the person schema, and the collection
module.exports = mongoose.model('Person', personSchema, 'people')
